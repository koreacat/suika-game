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
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";
import useMatterJS from "./useMatterJS";
import { getRandomFruitFeature } from './object/Fruit';
import GameOverModal from './gameOverModal';
import Intro from './intro';
import Header from './header';
var cx = classNames.bind(styles);
var SuikaGame = function () {
    var _a;
    var _b = useState(0), bestScore = _b[0], setBestScore = _b[1];
    var _c = useState(0), score = _c[0], setScore = _c[1];
    var _d = useState((_a = getRandomFruitFeature()) === null || _a === void 0 ? void 0 : _a.label), nextItem = _d[0], setNextItem = _d[1];
    var _e = useState(false), isStart = _e[0], setIsStart = _e[1];
    var _f = useState(false), isGameOver = _f[0], setIsGameOver = _f[1];
    var clear = useMatterJS({ score: score, setScore: setScore, nextItem: nextItem, setNextItem: setNextItem, isGameOver: isGameOver, setIsGameOver: setIsGameOver }).clear;
    useEffect(function () {
        var bestScore = localStorage.getItem('bestScore');
        if (bestScore)
            setBestScore(Number(bestScore));
    }, [isGameOver]);
    useEffect(function () {
        if (isGameOver) {
            var bestScore_1 = localStorage.getItem('bestScore') || 0;
            if (score > Number(bestScore_1)) {
                localStorage.setItem('bestScore', score.toString());
            }
        }
    }, [isGameOver]);
    var handleTryAgain = function () {
        var _a;
        setScore(0);
        setNextItem((_a = getRandomFruitFeature()) === null || _a === void 0 ? void 0 : _a.label);
        setIsGameOver(false);
        clear();
    };
    var handleGameStart = function () {
        setIsStart(true);
    };
    return (_jsxs("div", __assign({ className: cx('gameArea') }, { children: [_jsx("div", __assign({ className: cx('gameWrap'), style: { visibility: isStart ? 'visible' : 'hidden' } }, { children: _jsxs("div", __assign({ className: cx('canvasArea') }, { children: [_jsx(Header, { bestScore: bestScore, score: score, nextItem: nextItem }), _jsx("div", { id: 'canvasWrap', className: cx('canvasWrap') })] })) })), _jsx(Intro, { isVisible: !isStart, handleGameStart: handleGameStart }), _jsx(GameOverModal, { isVisible: isGameOver, onClick: handleTryAgain, score: score })] })));
};
export default SuikaGame;
