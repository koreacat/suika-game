import Matter from 'matter-js';
import {useEffect} from "react";
import wall from "./object/Wall";

// 체리, 딸기, 포도, 오렌지, 감, 사과, 배, 복숭아, 파인애플, 멜론, 수박
const { Engine, Render, Bodies, World, Mouse, MouseConstraint } = Matter;
let engine: any, render: any, canvas: any = null;

const init = () => {
  canvas = document.getElementById('canvas');
  while (canvas.hasChildNodes()) canvas.removeChild(canvas.firstChild);
  engine = Engine.create();
  render = Render.create({element: canvas, engine: engine, options: {
      width: 300,
      height: 500,
      wireframes: false
    }
  });
  World.add(engine.world, [...wall]);
};

const draw = () => {
  const options = () => {
    return {
      restitution: 0,
      render: {
        fillStyle: `RGB(255, 255, 255)`,
      }
    }
  };

  const circle = Bodies.circle(100, 30, 25, options());
  World.add(engine.world, [circle]);
};

const event = () => {
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
  render.mouse = mouse;
};

const run = () => {
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