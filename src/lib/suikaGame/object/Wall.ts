import Matter from "matter-js";
import {RENDER_HEIGHT, RENDER_WIDTH} from "./Size";

const WALL_WIDTH = RENDER_WIDTH * 10;
const WALL_HEIGHT = RENDER_HEIGHT * 10
const wallBottom = Matter.Bodies.rectangle(RENDER_WIDTH/2, (WALL_HEIGHT + RENDER_HEIGHT * 2) / 2, WALL_WIDTH, WALL_HEIGHT, {isStatic: true, friction: 1, render: { fillStyle: 'none' }});
const wallLeft = Matter.Bodies.rectangle(-WALL_WIDTH/2, RENDER_HEIGHT/2, WALL_WIDTH, WALL_HEIGHT, {isStatic: true, friction: 1,  render: { fillStyle: 'none' }});
const wallRight = Matter.Bodies.rectangle(WALL_WIDTH/2 + RENDER_WIDTH, RENDER_HEIGHT/2, WALL_WIDTH, WALL_HEIGHT, {isStatic: true, friction: 1, render: { fillStyle: 'none' }});
const Wall = [ wallBottom, wallLeft, wallRight ];
export default Wall;