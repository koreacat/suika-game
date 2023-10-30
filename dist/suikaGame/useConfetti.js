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
import confetti from 'canvas-confetti';
var useConfetti = function () {
    var fireConfetti = function () {
        var count = 200;
        var defaults = {
            origin: { y: 1 },
        };
        function fire(particleRatio, opts) {
            confetti(__assign(__assign(__assign({}, defaults), opts), { particleCount: Math.floor(count * particleRatio) }));
        }
        fire(0.25, {
            spread: 90,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 90,
        });
        fire(0.35, {
            spread: 90,
            startVelocity: 75,
            decay: 0.91,
            scalar: 0.8,
        });
        fire(0.1, {
            spread: 90,
            startVelocity: 55,
            decay: 0.92,
            scalar: 1.2,
        });
        fire(0.1, {
            spread: 90,
            startVelocity: 75,
        });
    };
    var fireRapidStarConfetti = function () {
        var end = Date.now() + (5 * 1000);
        var colors = ['#bb0000', '#ffffff'];
        (function frame() {
            confetti({
                particleCount: 2,
                angle: 80,
                spread: 55,
                origin: { x: 0, y: 0.8 },
                colors: colors
            });
            confetti({
                particleCount: 2,
                angle: 100,
                spread: 55,
                origin: { x: 1, y: 0.8 },
                colors: colors
            });
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };
    return {
        fireConfetti: fireConfetti,
        fireRapidStarConfetti: fireRapidStarConfetti
    };
};
export default useConfetti;
