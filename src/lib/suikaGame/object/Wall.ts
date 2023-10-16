import Matter from "matter-js";
import {getRenderHeight, getRenderWidth} from "./Size";

const WALL_WIDTH = getRenderWidth() * 10;
const WALL_HEIGHT = getRenderHeight() * 10
const wallBack = Matter.Bodies.rectangle(getRenderWidth(), getRenderHeight(), getRenderWidth() * 2, getRenderHeight() * 2, {isStatic: true, isSensor: true, render: { fillStyle: 'none' }});
const wallBottom = Matter.Bodies.rectangle(getRenderWidth()/2, (WALL_HEIGHT + getRenderHeight() * 2) / 2, WALL_WIDTH, WALL_HEIGHT, {isStatic: true, friction: 1, render: { fillStyle: 'none' }});
const wallLeft = Matter.Bodies.rectangle(-WALL_WIDTH/2, getRenderHeight()/2, WALL_WIDTH, WALL_HEIGHT, {isStatic: true, friction: 1,  render: { fillStyle: 'none' }});
const wallRight = Matter.Bodies.rectangle(WALL_WIDTH/2 + getRenderWidth(), getRenderHeight()/2, WALL_WIDTH, WALL_HEIGHT, {isStatic: true, friction: 1, render: { fillStyle: 'none' }});
const Wall = [ wallBack, wallBottom, wallLeft, wallRight ];
export default Wall;