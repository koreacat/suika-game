import Matter from 'matter-js';
import {useEffect} from "react";
import Wall from "./object/Wall";
import {Fruit, FruitType, getFruit} from "./object/Fruit";
import {RENDER_HEIGHT, RENDER_WIDTH} from "./object/Size";

const {Engine, Render, World, Mouse, MouseConstraint} = Matter;
const engine = Engine.create();
let render: Matter.Render | null = null;

const renderOptions = {
  width: RENDER_WIDTH,
  height: RENDER_HEIGHT,
  wireframes: false
}

const init = () => {
  const canvas = document.getElementById('canvas');
  if (!canvas) return;
  while (canvas.hasChildNodes() && canvas.firstChild) canvas.removeChild(canvas.firstChild);
  render = Render.create({element: canvas, engine: engine, options: renderOptions});
  World.add(engine.world, [...Wall]);
};

const draw = () => {
  World.add(engine.world, [getFruit(Fruit.CHERRY)]);
  return;

  Object.values(Fruit).forEach((fruit: FruitType) => {
    World.add(engine.world, [getFruit(fruit)]);
  });
};

const event = () => {
  if (!render) return;

  const getOptions = (): any => {
    return {
      mouse: mouse,
      constraint: {
        stiffness: 1,
        render: {
          visible: false
        }
      }
    }
  };

  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, getOptions());
  World.add(engine.world, mouseConstraint);
  Object.assign(mouse)
};

const run = () => {
  if (!render) return;
  Engine.run(engine);
  Render.run(render);
};

const clear = () => {
  World.clear(engine.world, true);
  event();
};

const useMatterJS = () => {
  useEffect(() => {
    init();
    draw();
    event();
    run();
  }, []);
}

export default useMatterJS;