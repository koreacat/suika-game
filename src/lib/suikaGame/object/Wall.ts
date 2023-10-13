import Matter from "matter-js";
const wallTop = Matter.Bodies.rectangle(150,-1000, 2000, 2000, {isStatic: true});
const wallBottom = Matter.Bodies.rectangle(150, 1500, 2000, 2000, {isStatic: true});
const wallLeft = Matter.Bodies.rectangle(-1000, 250, 2000, 2000, {isStatic: true});
const wallRight = Matter.Bodies.rectangle(1300, 250, 2000, 2000, {isStatic: true});
const wall = [wallTop, wallBottom, wallLeft, wallRight];
export default wall;