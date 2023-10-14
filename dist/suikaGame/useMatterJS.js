var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import Matter from 'matter-js';
import { useEffect } from "react";
import Wall from "./object/Wall";
import { Fruit, getFruit } from "./object/Fruit";
import { RENDER_HEIGHT, RENDER_WIDTH } from "./object/Size";
var Engine = Matter.Engine, Render = Matter.Render, World = Matter.World, Mouse = Matter.Mouse, MouseConstraint = Matter.MouseConstraint;
var engine = Engine.create();
var render = null;
var renderOptions = {
    width: RENDER_WIDTH,
    height: RENDER_HEIGHT,
    wireframes: false
};
var init = function () {
    var canvas = document.getElementById('canvas');
    if (!canvas)
        return;
    while (canvas.hasChildNodes() && canvas.firstChild)
        canvas.removeChild(canvas.firstChild);
    render = Render.create({ element: canvas, engine: engine, options: renderOptions });
    World.add(engine.world, __spreadArray([], Wall, true));
};
var draw = function () {
    World.add(engine.world, [getFruit(Fruit.CHERRY)]);
    return;
    Object.values(Fruit).forEach(function (fruit) {
        World.add(engine.world, [getFruit(fruit)]);
    });
};
var event = function () {
    if (!render)
        return;
    var getOptions = function () {
        return {
            mouse: mouse,
            constraint: {
                stiffness: 1,
                render: {
                    visible: false
                }
            }
        };
    };
    var mouse = Mouse.create(render.canvas);
    var mouseConstraint = MouseConstraint.create(engine, getOptions());
    World.add(engine.world, mouseConstraint);
    Object.assign(mouse);
};
var run = function () {
    if (!render)
        return;
    Engine.run(engine);
    Render.run(render);
};
var clear = function () {
    World.clear(engine.world, true);
    event();
};
var useMatterJS = function () {
    useEffect(function () {
        init();
        draw();
        event();
        run();
    }, []);
};
export default useMatterJS;
