import Matter from "matter-js";
import { RENDER_WIDTH, RENDER_HEIGHT } from "./Size";
const LINE_WIDTH = RENDER_WIDTH * 10;
const LINE_HEIGHT = 8;
export const GameOverLine = Matter.Bodies.rectangle(
    RENDER_WIDTH / 2,
    RENDER_HEIGHT / 6.5,
    LINE_WIDTH,
    LINE_HEIGHT,
    {
        isStatic: true, 
        isSensor: true, 
        collisionFilter: { group: -1 }, 
        render: { fillStyle: '#ffffff00' },
        label: 'gameOverLine',
    }
);

export const GameOverGuideLine = Matter.Bodies.rectangle(
    RENDER_WIDTH / 2,
    RENDER_HEIGHT / 6.5,
    LINE_WIDTH,
    LINE_HEIGHT,
    {
        isStatic: true, 
        isSensor: true, 
        collisionFilter: { group: -1 }, 
        render: { fillStyle: '#ffffff20' },
        label: 'guideLine',
    }
)
