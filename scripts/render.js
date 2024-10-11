"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharedData_1 = require("./sharedData");
window.onload = function () {
    resize();
};
window.onresize = function () {
    resize();
};
const translation = {
    x: 0,
    y: 0,
    scale: 1
};
function init() {
    let gamecvs = document.getElementById('game');
    let ctx = gamecvs.getContext('2d');
}
function resize() {
    translation.x = translation.y = 0;
    translation.scale = 1;
    sharedData_1.gamecvs.width = window.innerWidth;
    sharedData_1.gamecvs.height = window.innerHeight;
}
function render() {
    let gamecvs = document.getElementById('game');
    let ctx = gamecvs.getContext('2d');
    let w = gamecvs.width, h = gamecvs.height;
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(translation.x, translation.y);
    ctx.scale(translation.scale, translation.scale);
    ctx.restore();
}
