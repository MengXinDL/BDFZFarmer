window.onload = function () {
    resize();
};
window.onresize = function () {
    resize();
};
var translation = {
    x: 0,
    y: 0,
    scale: 1
};
function init() {
    var gamecvs = document.getElementById('game');
    var ctx = gamecvs.getContext('2d');
    ctx;
}
function resize() {
    var gamecvs = document.getElementById('game');
    translation.x = translation.y = 0;
    translation.scale = 1;
    gamecvs.width = window.innerWidth;
    gamecvs.height = window.innerHeight;
}
function render() {
    var gamecvs = document.getElementById('game');
    var ctx = gamecvs.getContext('2d');
    var w = gamecvs.width, h = gamecvs.height;
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(translation.x, translation.y);
    ctx.scale(translation.scale, translation.scale);
    ctx.restore();
}
