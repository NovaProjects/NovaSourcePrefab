"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.short = exports.long = void 0;
const longformat = (converted) => {
    let days = converted[0];
    let hours = converted[1];
    let minutes = converted[2];
    let seconds = converted[3];
    let dias = 'days';
    let horas = 'hours';
    let minutos = 'minutes';
    let segundos = 'seconds';
    if (days <= 0) {
        days = ' '.trim();
        dias = ' '.trim();
    }
    if (days == 1)
        dias = dias.replace('s', ' ').trim();
    if (hours <= 0) {
        hours = ' '.trim();
        horas = ' '.trim();
    }
    if (hours == 1)
        horas = 'hour';
    if (minutes <= 0) {
        minutes = ' '.trim();
        minutos = ' '.trim();
    }
    if (minutes == 1)
        minutos = 'minute';
    if (seconds <= 0) {
        seconds = ' '.trim();
        segundos = ' '.trim();
    }
    if (seconds == 1)
        segundos = 'second';
    let words = [days, dias, hours, horas, minutes, minutos, seconds, segundos];
    words.map(word => word += ' ');
    let joined = words.join(' ').split(/[ ]+/);
    joined.map(join => join += ' ');
    return joined;
};
exports.long = longformat;
const shortformat = (converted) => {
    let days = converted[0];
    let hours = converted[1];
    let minutes = converted[2];
    let seconds = converted[3];
    let dias = 'd';
    let horas = 'h';
    let minutos = 'm';
    let segundos = 's';
    if (days <= 0) {
        days = ' '.trim();
        dias = ' '.trim();
    }
    if (hours <= 0) {
        hours = ' '.trim();
        horas = ' '.trim();
    }
    if (minutes <= 0) {
        minutes = ' '.trim();
        minutos = ' '.trim();
    }
    if (seconds <= 0) {
        seconds = ' '.trim();
        segundos = ' '.trim();
    }
    days = days + dias;
    hours = hours + horas;
    minutes = minutes + minutos;
    seconds = seconds + segundos;
    let words = [days, hours, minutes, seconds];
    words.map(word => word += ' ');
    let joined = words.join(' ').split(/[ ]+/);
    joined.map(join => join += ' ');
    return joined;
};
exports.short = shortformat;
//# sourceMappingURL=types.js.map
