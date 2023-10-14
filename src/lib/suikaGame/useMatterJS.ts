import Matter from 'matter-js';
import { SetStateAction, useEffect } from "react";
import Wall from "./object/Wall";
import { Fruit, getFruitFeature, getNextFruitFeature, getRandomFruitFeature } from "./object/Fruit";
import { RENDER_HEIGHT, RENDER_WIDTH } from "./object/Size";

const { Engine, Render, World, Mouse, MouseConstraint } = Matter;
const engine = Engine.create();
const frameInterval = 1000 / 60; // 60fps

let render: Matter.Render | null = null;
let lastTime = 0;
let fixedItemTimeOut: NodeJS.Timeout | null = null;
let fixedItem: Matter.Body | null = null; // 고정된 원
let isDragging = false;
let prevPosition = { x: RENDER_WIDTH / 2, y: 30};
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
  nextFruit = props.nextItem;
  createFixedItem(props);
};

const createFixedItem = ({ setNextItem }: UseMatterJSProps) => {
  if (fixedItem) return;
  if (!nextFruit) return;
  const feature = getFruitFeature(nextFruit);
  const label  = feature?.label;
  const radius = feature?.radius || 1;
  const color = feature?.color;
  fixedItem = Matter.Bodies.circle(prevPosition.x, prevPosition.y, radius, {
    isStatic: true,
    isSensor: true,
    label: label,
    restitution: 0,
    render: {
      fillStyle: color,
    }
  });
  World.add(engine.world, fixedItem);

  const newNextItem = getRandomFruitFeature()?.label as Fruit;
  nextFruit = newNextItem;
  setNextItem(newNextItem);
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
    if (event.body === fixedItem) {
      fixedItemTimeOut && clearTimeout(fixedItemTimeOut);
      isDragging = true;
    }
  });

  // 마우스 이동 시 원을 마우스 위치로 이동
  Matter.Events.on(mouseConstraint, 'mousemove', (event: any) => {
    if (fixedItem && isDragging) {
      Matter.Body.setPosition(fixedItem, {
        x: event.mouse.position.x,
        y: fixedItem.position.y,
      });
    }
  });

  // 마우스 버튼 뗄 때 원의 고정 해제
  Matter.Events.on(mouseConstraint, 'enddrag', (event) => {
    if(event.body !== fixedItem) return;
    
    isDragging = false;

    // 원의 고정 해제
    if (!fixedItem) return;
    const label = fixedItem?.label;
    const radius = fixedItem?.circleRadius || 1;
    const color = fixedItem?.render.fillStyle;
    const newItem = Matter.Bodies.circle(fixedItem.position.x, fixedItem.position.y, radius, {
      isStatic: false,
      label: label,
      restitution: 0,
      friction: 0.9,
      render: {
        fillStyle: color,
      },
    });

    prevPosition.x = fixedItem.position.x;

    World.remove(engine.world, fixedItem);
    fixedItem = null;
    World.add(engine.world, newItem);

    fixedItemTimeOut = setTimeout(() => {
      createFixedItem(props);
    }, 500);
  });

  Matter.Events.on(engine, 'collisionStart', (event) => {
    const pairs = event.pairs;
    pairs.forEach((pair) => {
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;
      const midX = (bodyA.position.x + bodyB.position.x) / 2;
      const midY = (bodyA.position.y + bodyB.position.y) / 2;

      const labelA = bodyA.label as Fruit;
      const labelB = bodyB.label as Fruit;

      if(bodyA.isSensor || bodyB.isSensor) return;
      if(labelA === Fruit.WATERMELON && labelB === Fruit.WATERMELON) return;

      // 같은 크기인 경우에만 합치기
      if (labelA === labelB) {
        World.remove(engine.world, bodyA);
        World.remove(engine.world, bodyB);

        // 새로운 Fruit 생성 (크기가 한 사이즈 큰 것)
        const feature = getNextFruitFeature(labelA); // 이 함수는 한 사이즈 큰 Fruit 특성을 반환하도록 수정
        const label = feature?.label;
        const radius = feature?.radius || 1;
        const color = feature?.color;
        const score = feature?.score || 0;

        const newFruit = Matter.Bodies.circle(midX, midY, radius, {
          isStatic: false,
          label: label,
          restitution: 0,
          friction: 0.9,
          render: {
            fillStyle: color,
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
  requestAnimationFrame(animate);

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
  setScore: React.Dispatch<SetStateAction<number>>;
  nextItem: Fruit;
  setNextItem: React.Dispatch<SetStateAction<Fruit>>;
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
};

export default useMatterJS;
