"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamecvs = exports.box = void 0;
class box {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}
exports.box = box;
exports.gamecvs = document.getElementById('game');
