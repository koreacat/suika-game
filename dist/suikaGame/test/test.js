var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import './Matterjs.scss';
import Matter from 'matter-js';
import { getInteger } from "./useRandom";
var Engine = Matter.Engine, Render = Matter.Render, Bodies = Matter.Bodies, World = Matter.World, Mouse = Matter.Mouse, MouseConstraint = Matter.MouseConstraint, Composite = Matter.Composite;
var engine, render, canvas = null;
var worldAddInterval, worldAddStopTimeout = null;
var mouse, mouseConstraint = null;
var ground = Bodies.rectangle(150, 495, 280, 5, { isStatic: true });
var wallA = Bodies.rectangle(5, 250, 5, 550, { isStatic: true });
var wallB = Bodies.rectangle(295, 250, 5, 550, { isStatic: true });
var init = function () {
    canvas = document.getElementById('matterjsCanvas');
    while (canvas.hasChildNodes())
        canvas.removeChild(canvas.firstChild);
    engine = Engine.create();
    render = Render.create({ element: canvas, engine: engine, options: {
            width: 300,
            height: 500,
            wireframes: false
        }
    });
    World.add(engine.world, [ground, wallA, wallB]);
};
var draw = function () {
    var options = function () {
        return {
            restitution: 1.0,
            render: {
                fillStyle: "RGB(".concat(getInteger(126, 255), ", ").concat(getInteger(126, 255), ", ").concat(getInteger(126, 255), ")"),
                strokeStyle: '#ddd',
                lineWidth: 0
            }
        };
    };
    clearInterval(worldAddInterval);
    worldAddInterval = setInterval(function () {
        World.add(engine.world, [
            Bodies.circle(getInteger(50, 240), -10, getInteger(20, 30), options()),
            Bodies.rectangle(getInteger(50, 240), -10, getInteger(20, 30), getInteger(20, 30), options())
        ]);
    }, 200);
    clearTimeout(worldAddStopTimeout);
    worldAddStopTimeout = setTimeout(function () {
        clearInterval(worldAddInterval);
    }, 10000);
};
var event = function () {
    var options = function () {
        return {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        };
    };
    mouse = Mouse.create(render.canvas);
    mouseConstraint = MouseConstraint.create(engine, options());
    World.add(engine.world, mouseConstraint);
    render.mouse = mouse;
};
var run = function () {
    Engine.run(engine);
    Render.run(render);
};
var clear = function () {
    World.clear(engine.world, true);
    event();
};
var flush = function () {
    clearInterval(worldAddInterval);
    Composite.remove(engine.world, ground);
};
var fill = function () {
    draw();
    Composite.remove(engine.world, ground);
    World.add(engine.world, ground);
};
var Matterjs = function () {
    useEffect(function () {
        init();
        draw();
        event();
        run();
        return function () {
            clearInterval(worldAddInterval);
        };
    }, []);
    return (_jsx("div", __assign({ className: 'matterjs' }, { children: _jsxs("div", __assign({ className: 'matterjsWrap' }, { children: [_jsx("div", { id: 'matterjsCanvas', className: 'matterjsCanvas' }), _jsxs("div", { children: [_jsx("button", __assign({ onClick: flush }, { children: "flush" })), _jsx("button", __assign({ onClick: fill }, { children: "fill" }))] })] })) })));
};
export default Matterjs;
