"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = void 0;
const types_1 = require("./types");
const mathjs_1 = require("mathjs");
const convert = (date1, decimals = 0, date2 = null, action = '-') => {
    if (typeof date1 !== 'number') {
        date1 = new Date(date1).getTime();
    }
    if (typeof date2 !== 'number') {
        date2 = new Date(date2).getTime();
    }
    let number;
    let totalSeconds;
    let days;
    let hours;
    let minutes;
    let seconds;
    if (date2 == null) {
        try {
            number = date1;
            totalSeconds = (number / 1000);
            days = Math.floor(totalSeconds / 86400).toFixed() || 0;
            totalSeconds %= 86400;
            hours = Math.floor(totalSeconds / 3600).toFixed() || 0;
            totalSeconds %= 3600;
            minutes = Math.floor(totalSeconds / 60).toFixed() || 0;
            seconds = totalSeconds % 60 || 0;
            if (isNaN(decimals))
                return console.warn(decimals + " isn't a number, received " + typeof decimals);
            seconds = seconds.toFixed(decimals);
            return [days, hours, minutes, seconds];
        }
        catch (err) {
            return console.warn(err);
        }
    }
    else {
        try {
            let first = date1;
            let second = date2;
            let arr = ['-', '+', '*', '/'];
            if (!arr.includes(action))
                return console.warn('Invalid action, you used ' + action + '. The valid actions are ' + arr.join(', '));
            number = mathjs_1.evaluate(first.toString() + action + second.toString());
            totalSeconds = (number / 1000);
            days = Math.floor(totalSeconds / 86400).toFixed() || 0;
            totalSeconds %= 86400;
            hours = Math.floor(totalSeconds / 3600).toFixed() || 0;
            totalSeconds %= 3600;
            minutes = Math.floor(totalSeconds / 60).toFixed() || 0;
            seconds = totalSeconds % 60 || 0;
            if (isNaN(decimals))
                return console.warn(decimals + " isn't a number, received " + typeof decimals);
            seconds = seconds.toFixed(decimals);
            return [days, hours, minutes, seconds];
        }
        catch (err) {
            return console.warn(err);
        }
    }
};
exports.convert = convert;
const ms = (array, format = 'short') => {
    if (format == 'short') {
        return types_1.short(array).join(' ');
    }
    else {
        return types_1.long(array).join(' ');
    }
};
exports.default = ms;
//# sourceMappingURL=dates.js.map
