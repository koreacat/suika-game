import Matter from "matter-js";
import {RENDER_HEIGHT, RENDER_WIDTH} from "./Size";

const WALL_WIDTH = RENDER_WIDTH * 10;
const WALL_HEIGHT = RENDER_HEIGHT * 10
const wallTop = Matter.Bodies.rectangle(RENDER_WIDTH/2,(-WALL_HEIGHT + RENDER_HEIGHT * 2) / 2 - RENDER_HEIGHT, WALL_WIDTH, WALL_HEIGHT, {isStatic: true});
const wallBottom = Matter.Bodies.rectangle(RENDER_WIDTH/2, (WALL_HEIGHT + RENDER_HEIGHT * 2) / 2, WALL_WIDTH, WALL_HEIGHT, {isStatic: true});
// const wallLeft = Matter.Bodies.rectangle(-1000, RENDER_HEIGHT/2, WALL_WIDTH, WALL_HEIGHT, {isStatic: true});
// const wallRight = Matter.Bodies.rectangle(1300, RENDER_HEIGHT/2, WALL_WIDTH, WALL_HEIGHT, {isStatic: true});
const Wall = [ wallTop, wallBottom, ];
export default Wall;