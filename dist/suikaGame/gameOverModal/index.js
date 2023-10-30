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
import { useState } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";
var cx = classNames.bind(styles);
var timeout = null;
var GameOverModal = function (_a) {
    var isVisible = _a.isVisible, onClick = _a.onClick, score = _a.score;
    var _b = useState(false), toastVisible = _b[0], setToastVisible = _b[1];
    if (!isVisible)
        return null;
    var share = function () {
        if (navigator.share) {
            navigator.share({
                title: '수박 만들기 게임',
                text: '과일들을 모아 수박을 만들어보세요.',
                url: 'https://koreacat.github.io/suika-game/',
            })
                .then(function () { return console.log('done'); })
                .catch(function (error) { return console.log(error); });
        }
        else {
            timeout && clearTimeout(timeout);
            var urlToCopy = window.location.href;
            // Clipboard API를 지원하는지 확인
            if (document.queryCommandSupported("copy")) {
                var input = document.createElement("input");
                input.value = urlToCopy;
                document.body.appendChild(input);
                input.select();
                document.execCommand("copy");
                document.body.removeChild(input);
            }
            else {
                navigator.clipboard.writeText(urlToCopy);
            }
            setToastVisible(true);
            timeout = setTimeout(function () {
                setToastVisible(false);
            }, 2800);
        }
    };
    return (_jsxs("div", __assign({ className: cx('gameOverArea') }, { children: [_jsx("span", __assign({ className: cx('text') }, { children: "GAME OVER" })), _jsxs("span", __assign({ className: cx('score') }, { children: ["SCORE: ", score] })), _jsx("button", __assign({ className: cx('btn'), onClick: onClick }, { children: "\u21BB TRY AGAIN?" })), _jsxs("div", __assign({ className: cx('linkArea') }, { children: [_jsx("a", __assign({ href: 'https://forms.gle/QbPDG6rzT4spywyf6', target: '_blank', className: cx('formsLink') }, { children: "\uC758\uACAC \uB0A8\uAE30\uAE30" })), _jsx("button", __assign({ className: cx('shareaBtn'), onClick: share }, { children: "\uACF5\uC720\uD558\uAE30" }))] })), _jsx("div", __assign({ className: cx('toastArea', { show: toastVisible }) }, { children: "\uD83C\uDF49URL\uC774 \uBCF5\uC0AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4." }))] })));
};
export default GameOverModal;
