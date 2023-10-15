import Matter from 'matter-js';
import { SetStateAction, useEffect } from "react";
import Wall from "./object/Wall";
import { Fruit, getFruitFeature, getNextFruitFeature, getRandomFruitFeature } from "./object/Fruit";
import { RENDER_HEIGHT, RENDER_WIDTH } from "./object/Size";
import { GameOverLine, GameOverGuideLine } from './object/GameOverLine';
import { GuideLine, GuideLineColor } from './object/GuideLine';

const { Engine, Render, World, Mouse, MouseConstraint } = Matter;
const frameInterval = 1000 / 60; // 60fps
const getImgUrl = (fruit: Fruit) => require('../../resource/' + fruit + '.png');

let engine = Engine.create();
let render: Matter.Render | null = null;
let requestAnimation: number | null = null;
let lastTime = 0;
let fixedItemTimeOut: NodeJS.Timeout | null = null;
let fixedItem: Matter.Body | null = null; // 고정된 원
let prevPosition = { x: RENDER_WIDTH / 2, y: 50 };
let nextFruit: Fruit | null = null;

const renderOptions = {
  width: RENDER_WIDTH,
  height: RENDER_HEIGHT,
  wireframes: false,
  background: '#ffffff40',
  borderRadius: '16px',
};

const init = (props: UseMatterJSProps) => {
  const canvas = document.getElementById('canvas');
  if (!canvas) return;
  while (canvas.hasChildNodes() && canvas.firstChild) canvas.removeChild(canvas.firstChild);
  engine.world.gravity.y = 2.0;
  render = Render.create({ element: canvas, engine: engine, options: renderOptions });
  World.add(engine.world, [...Wall]);
  World.add(engine.world, [GameOverLine, GameOverGuideLine, GuideLine]);
  nextFruit = props.nextItem;
  createFixedItem(props);
};

const createFixedItem = ({ setNextItem }: UseMatterJSProps) => {
  if (fixedItem) return;
  if (!nextFruit) return;
  const feature = getFruitFeature(nextFruit);
  const label = feature?.label as Fruit;
  const radius = feature?.radius || 1;
  fixedItem = Matter.Bodies.circle(prevPosition.x, prevPosition.y, radius, {
    isStatic: true,
    isSensor: true,
    label: label,
    restitution: 0,
    render: {
      sprite: {
        texture: getImgUrl(label),
        xScale: (radius * 2) / 256,
        yScale: (radius * 2) / 256,
      }
    }
  });
  World.add(engine.world, fixedItem);

  const newNextItem = getRandomFruitFeature()?.label as Fruit;
  nextFruit = newNextItem;
  setNextItem(newNextItem);
}

const handleGameOver = (props: UseMatterJSProps) => {
  props.setIsGameOver(true);
  requestAnimation && cancelAnimationFrame(requestAnimation);
}

const event = (props: UseMatterJSProps) => {
  if (!render) return;

  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 1,
      render: {
        visible: false,
      }
    } as Matter.Constraint
  });

  // 마우스 버튼 누르면 원 이동 시작
  Matter.Events.on(mouseConstraint, 'startdrag', (event) => {
    if(!fixedItem) return;
    fixedItemTimeOut && clearTimeout(fixedItemTimeOut);

    if (fixedItem) {
      Matter.Body.setPosition(fixedItem, {
        x: event.mouse.position.x,
        y: fixedItem.position.y,
      });
      Matter.Body.setPosition(GuideLine, {
        x: event.mouse.position.x,
        y: GuideLine.position.y,
      })
    }
  });

  // 마우스 이동 시 원을 마우스 위치로 이동
  Matter.Events.on(mouseConstraint, 'mousemove', (event: any) => {
    if (fixedItem) {
      Matter.Body.setPosition(fixedItem, {
        x: event.mouse.position.x,
        y: fixedItem.position.y,
      });
      Matter.Body.setPosition(GuideLine, {
        x: event.mouse.position.x,
        y: GuideLine.position.y,
      })
    }
  });

  // 마우스 버튼 뗄 때 원의 고정 해제
  Matter.Events.on(mouseConstraint, 'enddrag', (event) => {
    // 원의 고정 해제
    if (!fixedItem) return;
    const popSound = new Audio(require('../../resource/pop.mp3'));
    popSound.play();
    const label = fixedItem?.label as Fruit;
    const feature = getFruitFeature(label);
    const radius = feature?.radius || 1;
    const newItem = Matter.Bodies.circle(fixedItem.position.x, fixedItem.position.y, radius, {
      isStatic: false,
      label: label,
      restitution: 0,
      friction: 1,
      render: {
        sprite: {
          texture: getImgUrl(label),
          xScale: (radius * 2) / 256,
          yScale: (radius * 2) / 256,
        }
      },
    });

    prevPosition.x = fixedItem.position.x;

    GuideLine.render.fillStyle = '#ffffff00';
    World.remove(engine.world, fixedItem);
    World.remove(engine.world, GameOverLine);
    fixedItem = null;
    World.add(engine.world, newItem);

    fixedItemTimeOut = setTimeout(() => {
      GuideLine.render.fillStyle = GuideLineColor;
      createFixedItem(props);
      World.add(engine.world, GameOverLine);
    }, 800);
  });

  Matter.Events.on(engine, 'collisionStart', (event) => {
    const pairs = event.pairs;
    pairs.forEach((pair) => {
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;


      if (bodyA.label === 'gameOverLine' || bodyB.label === 'gameOverLine') {
        handleGameOver(props);
        return;
      }

      const midX = (bodyA.position.x + bodyB.position.x) / 2;
      const midY = (bodyA.position.y + bodyB.position.y) / 2;

      const labelA = bodyA.label as Fruit;
      const labelB = bodyB.label as Fruit;

      if (bodyA.isSensor || bodyB.isSensor) return;
      if (labelA === Fruit.WATERMELON && labelB === Fruit.WATERMELON) return;

      // 같은 크기인 경우에만 합치기
      if (labelA === labelB) {
        const popSound = new Audio(require('../../resource/pop2.mp3'));
        popSound.play();

        World.remove(engine.world, bodyA);
        World.remove(engine.world, bodyB);

        // 새로운 Fruit 생성 (크기가 한 사이즈 큰 것)
        const feature = getNextFruitFeature(labelA); // 이 함수는 한 사이즈 큰 Fruit 특성을 반환하도록 수정
        const label = feature?.label as Fruit;
        const radius = feature?.radius || 1;
        const score = feature?.score || 0;

        const newFruit = Matter.Bodies.circle(midX, midY, radius, {
          isStatic: false,
          label: label,
          restitution: 0,
          friction: 1,
          render: {
            sprite: {
              texture: getImgUrl(label),
              xScale: (radius * 2) / 256,
              yScale: (radius * 2) / 256,
            }
          }
        });

        World.add(engine.world, newFruit);
        props.setScore(prev => prev + score);
      }
    });
  });

  // World.add(engine.world, mouseConstraint);
};

const animate = (currentTime: number) => {
  requestAnimation = requestAnimationFrame(animate);

  const elapsed = currentTime - lastTime;

  if (elapsed > frameInterval) {
    Engine.update(engine, frameInterval);
    lastTime = currentTime - (elapsed % frameInterval);
  }
};

const run = () => {
  if (!render) return;
  animate(0); // 시작할 때 시간을 0으로 초기화
  Render.run(render);
};

interface UseMatterJSProps {
  score: number;
  setScore: React.Dispatch<SetStateAction<number>>;
  nextItem: Fruit;
  setNextItem: React.Dispatch<SetStateAction<Fruit>>;
  isGameOver: boolean;
  setIsGameOver: React.Dispatch<SetStateAction<boolean>>;
}

const useMatterJS = (props: UseMatterJSProps) => {
  useEffect(() => {
    init(props);
    event(props);
    run();

    return (() => {
      props.setScore(0);
    })
  }, []);

  const clear = () => {
    fixedItem = null;
    engine = Engine.create();
    init(props);
    event(props);
    run();
  }

  return {
    clear
  }
};

export default useMatterJS;
