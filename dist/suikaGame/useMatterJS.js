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
import { Fruit, getFruitFeature, getNextFruitFeature, getRandomFruitFeature } from "./object/Fruit";
import { getRenderHeight, getRenderWidth } from "./object/Size";
import { GameOverLine, GameOverGuideLine } from './object/GameOverLine';
import { GuideLine, GuideLineColor } from './object/GuideLine';
import useConfetti from "./useConfetti";
var Engine = Matter.Engine, Render = Matter.Render, World = Matter.World, Mouse = Matter.Mouse, MouseConstraint = Matter.MouseConstraint;
var frameInterval = 1000 / 60; // 60fps
var getImgUrl = function (fruit) { return require('../../resource/' + fruit + '.png'); };
var engine = Engine.create();
var render = null;
var requestAnimation = null;
var lastTime = 0;
var fixedItemTimeOut = null;
var fixedItem = null; // 고정된 아이템
var prevPosition = { x: getRenderWidth() / 2, y: 50 };
var nextFruit = null;
var prevMergingFruitIds = [];
var renderOptions = {
    width: getRenderWidth(),
    height: getRenderHeight(),
    wireframes: false,
    background: '#ffffff40',
    borderRadius: '16px',
};
var init = function (props) {
    var canvasWrapEl = document.getElementById('canvasWrap');
    if (!canvasWrapEl)
        return;
    while (canvasWrapEl.hasChildNodes() && canvasWrapEl.firstChild)
        canvasWrapEl.removeChild(canvasWrapEl.firstChild);
    engine.world.gravity.y = 2.0;
    render = Render.create({ element: canvasWrapEl, engine: engine, options: renderOptions });
    World.add(engine.world, __spreadArray([], Wall, true));
    World.add(engine.world, [GameOverGuideLine, GuideLine]);
    nextFruit = props.nextItem;
    createFixedItem(props);
};
var createFixedItem = function (_a) {
    var _b;
    var setNextItem = _a.setNextItem;
    if (fixedItem)
        return;
    if (!nextFruit)
        return;
    var feature = getFruitFeature(nextFruit);
    var label = feature === null || feature === void 0 ? void 0 : feature.label;
    var radius = (feature === null || feature === void 0 ? void 0 : feature.radius) || 1;
    var mass = (feature === null || feature === void 0 ? void 0 : feature.mass) || 1;
    fixedItem = Matter.Bodies.circle(prevPosition.x, prevPosition.y, radius, {
        isStatic: true,
        isSensor: true,
        label: label,
        restitution: 0,
        mass: mass,
        friction: 1,
        render: {
            sprite: {
                texture: getImgUrl(label),
                xScale: (radius * 2) / 250,
                yScale: (radius * 2) / 250,
            }
        }
    });
    World.add(engine.world, fixedItem);
    var newNextItem = (_b = getRandomFruitFeature()) === null || _b === void 0 ? void 0 : _b.label;
    nextFruit = newNextItem;
    setNextItem(newNextItem);
};
var handleGameOver = function (props) {
    props.setIsGameOver(true);
    requestAnimation && cancelAnimationFrame(requestAnimation);
};
var clamp = function (value, min, max) {
    return Math.min(Math.max(value, min), max);
};
var setPositionFixedItem = function (event) {
    if (!fixedItem)
        return;
    var minX = fixedItem.circleRadius ? fixedItem.circleRadius : 0;
    var maxX = fixedItem.circleRadius ? getRenderWidth() - fixedItem.circleRadius : getRenderWidth();
    Matter.Body.setPosition(fixedItem, {
        x: clamp(event.mouse.position.x, minX, maxX),
        y: fixedItem.position.y,
    });
    Matter.Body.setPosition(GuideLine, {
        x: clamp(event.mouse.position.x, minX, maxX),
        y: GuideLine.position.y,
    });
};
var event = function (props, effects) {
    if (!render)
        return;
    var mouse = Mouse.create(render.canvas);
    var mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 1,
            render: {
                visible: false,
            }
        }
    });
    // 마우스 버튼 누르면 원 이동 시작
    Matter.Events.on(mouseConstraint, 'startdrag', function (event) {
        if (!fixedItem)
            return;
        fixedItemTimeOut && clearTimeout(fixedItemTimeOut);
        prevMergingFruitIds = [];
        setPositionFixedItem(event);
    });
    // 마우스 이동 시 원을 마우스 위치로 이동
    Matter.Events.on(mouseConstraint, 'mousemove', function (event) {
        setPositionFixedItem(event);
    });
    // 마우스 버튼 뗄 때 원의 고정 해제
    Matter.Events.on(mouseConstraint, 'enddrag', function (event) {
        // 원의 고정 해제
        if (!fixedItem)
            return;
        setPositionFixedItem(event);
        var popSound = new Audio(require('../../resource/pop.mp3'));
        popSound.play();
        var label = fixedItem === null || fixedItem === void 0 ? void 0 : fixedItem.label;
        var feature = getFruitFeature(label);
        var radius = (feature === null || feature === void 0 ? void 0 : feature.radius) || 1;
        var mass = (feature === null || feature === void 0 ? void 0 : feature.mass) || 1;
        var newItem = Matter.Bodies.circle(fixedItem.position.x, fixedItem.position.y, radius, {
            isStatic: false,
            label: label,
            restitution: 0,
            mass: mass,
            friction: 1,
            render: {
                sprite: {
                    texture: getImgUrl(label),
                    xScale: (radius * 2) / 250,
                    yScale: (radius * 2) / 250,
                }
            },
        });
        prevPosition.x = fixedItem.position.x;
        GuideLine.render.fillStyle = '#ffffff00';
        World.remove(engine.world, fixedItem);
        World.remove(engine.world, GameOverLine);
        fixedItem = null;
        World.add(engine.world, newItem);
        fixedItemTimeOut = setTimeout(function () {
            GuideLine.render.fillStyle = GuideLineColor;
            World.add(engine.world, GameOverLine);
            createFixedItem(props);
        }, 750);
    });
    Matter.Events.on(engine, 'collisionStart', function (event) {
        var pairs = event.pairs;
        pairs.forEach(function (pair) {
            var bodyA = pair.bodyA;
            var bodyB = pair.bodyB;
            if (bodyA.label === GameOverLine.label || bodyB.label === GameOverLine.label) {
                handleGameOver(props);
                return;
            }
            var midX = (bodyA.position.x + bodyB.position.x) / 2;
            var midY = (bodyA.position.y + bodyB.position.y) / 2;
            var labelA = bodyA.label;
            var labelB = bodyB.label;
            if (bodyA.isSensor || bodyB.isSensor)
                return;
            if (labelA === Fruit.GOLDWATERMELON && labelB === Fruit.GOLDWATERMELON)
                return;
            // 이미 합치는 중이면 무시
            if (prevMergingFruitIds.includes(bodyA.id) || prevMergingFruitIds.includes(bodyB.id))
                return prevMergingFruitIds = [];
            // 같은 크기인 경우에만 합치기
            if (labelA === labelB) {
                prevMergingFruitIds = [bodyA.id, bodyB.id];
                // 과일이 합쳐질 때 사운드 효과
                var popSound = new Audio(require('../../resource/pop2.mp3'));
                popSound.play();
                World.remove(engine.world, bodyA);
                World.remove(engine.world, bodyB);
                // 새로운 Fruit 생성 (크기가 한 사이즈 큰 것)
                var feature = getNextFruitFeature(labelA); // 이 함수는 한 사이즈 큰 Fruit 특성을 반환하도록 수정
                var label = feature === null || feature === void 0 ? void 0 : feature.label;
                var radius = (feature === null || feature === void 0 ? void 0 : feature.radius) || 1;
                var mass = (feature === null || feature === void 0 ? void 0 : feature.mass) || 1;
                var score_1 = (feature === null || feature === void 0 ? void 0 : feature.score) || 0;
                // 수박이 만들어지면 폭죽 이펙트
                if (label === Fruit.WATERMELON)
                    effects.fireConfetti();
                // 황금 수박이 만들어지면 별 이펙트
                if (label === Fruit.GOLDWATERMELON)
                    effects.fireRapidStarConfetti();
                var newFruit = Matter.Bodies.circle(midX, midY, radius, {
                    isStatic: false,
                    label: label,
                    restitution: 0,
                    mass: mass,
                    friction: 1,
                    render: {
                        sprite: {
                            texture: getImgUrl(label),
                            xScale: (radius * 2) / 250,
                            yScale: (radius * 2) / 250,
                        }
                    }
                });
                World.add(engine.world, newFruit);
                props.setScore(function (prev) { return prev + score_1; });
            }
        });
    });
    // World.add(engine.world, mouseConstraint);
};
var animate = function (currentTime) {
    requestAnimation = requestAnimationFrame(animate);
    var elapsed = currentTime - lastTime;
    if (elapsed > frameInterval) {
        Engine.update(engine, frameInterval);
        lastTime = currentTime - (elapsed % frameInterval);
    }
};
var run = function () {
    if (!render)
        return;
    animate(0); // 시작할 때 시간을 0으로 초기화
    Render.run(render);
};
var useMatterJS = function (props) {
    var _a = useConfetti(), fireConfetti = _a.fireConfetti, fireRapidStarConfetti = _a.fireRapidStarConfetti;
    useEffect(function () {
        init(props);
        event(props, { fireConfetti: fireConfetti, fireRapidStarConfetti: fireRapidStarConfetti });
        run();
        return (function () {
            props.setScore(0);
        });
    }, []);
    var clear = function () {
        fixedItem = null;
        engine = Engine.create();
        init(props);
        event(props, { fireConfetti: fireConfetti, fireRapidStarConfetti: fireRapidStarConfetti });
        run();
    };
    return {
        clear: clear
    };
};
export default useMatterJS;
