import Matter from "matter-js";
import { getRenderWidth, getRenderHeight } from "./Size";
var LINE_WIDTH = getRenderWidth() * 10;
var LINE_HEIGHT = 8;
export var GameOverLine = Matter.Bodies.rectangle(getRenderWidth() / 2, getRenderHeight() / 6.5 - 30, LINE_WIDTH, LINE_HEIGHT, {
    isStatic: true,
    isSensor: true,
    collisionFilter: { group: -1 },
    render: { fillStyle: '#ffffff00' },
    label: 'GAME_OVER_LINE',
});
export var GameOverGuideLine = Matter.Bodies.rectangle(getRenderWidth() / 2, getRenderHeight() / 6.5, LINE_WIDTH, LINE_HEIGHT, {
    isStatic: true,
    isSensor: true,
    collisionFilter: { group: -1 },
    render: { fillStyle: '#ffffff20' },
    label: 'GAME_OVER_GUIDE_LINE',
});
