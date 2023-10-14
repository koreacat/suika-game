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
import { jsx as _jsx } from "react/jsx-runtime";
import styles from './index.module.scss';
import classNames from "classnames/bind";
import useMatterJS from "./useMatterJS";
var cx = classNames.bind(styles);
var SuikaGame = function () {
    useMatterJS();
    return (_jsx("div", __assign({ className: cx('area') }, { children: _jsx("div", __assign({ className: cx('wrap') }, { children: _jsx("div", { id: 'canvas', className: cx('canvas') }) })) })));
};
export default SuikaGame;
