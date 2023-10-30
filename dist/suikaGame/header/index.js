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
import { getRenderWidth } from '../object/Size';
import styles from './index.module.scss';
import classNames from "classnames/bind";
var cx = classNames.bind(styles);
var Header = function (_a) {
    var score = _a.score, bestScore = _a.bestScore, nextItem = _a.nextItem;
    var getBestScore = function () {
        return score > bestScore ? score : bestScore;
    };
    return (_jsxs("div", __assign({ className: cx('headerArea'), style: { maxWidth: getRenderWidth() + 4 } }, { children: [_jsxs("div", __assign({ className: cx('bestScoreArea') }, { children: [_jsx("span", __assign({ className: cx('text') }, { children: "BEST" })), _jsx("span", __assign({ className: cx('number') }, { children: getBestScore() }))] })), _jsx("div", __assign({ className: cx('scoreArea') }, { children: _jsx("span", __assign({ className: cx('score') }, { children: score })) })), _jsxs("div", __assign({ className: cx('nextArea') }, { children: [_jsx("span", __assign({ className: cx('text') }, { children: "NEXT" })), _jsx("div", __assign({ className: cx('next') }, { children: _jsx("span", { className: cx('img'), style: { backgroundImage: "url(".concat(require('../../../resource/' + nextItem + '.png'), ")") } }) }))] }))] })));
};
export default Header;
