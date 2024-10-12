import { box, data } from "./sharedData";

window.onload = function() {
    data.gamecvs = document.getElementById('game') as HTMLCanvasElement;
    init();
    resize();
}
window.onresize = function() {
    resize();
}

const translation: {x: number, y: number, scale: number} = {
    x: 0,
    y: 0,
    scale: 1
};

function init(): void {
    let ctx = data.gamecvs.getContext('2d');
    data.boxs.push(new box(0, 0, 100, 100, 'red'));
}

function resize(): void {
    translation.x = translation.y = 0;
    translation.scale = 1;
    data.gamecvs.width = window.innerWidth;
    data.gamecvs.height = window.innerHeight;
}

function render(): void {
    let ctx: CanvasRenderingContext2D = data.gamecvs.getContext('2d') as CanvasRenderingContext2D;
    let w: number = data.gamecvs.width, h: number = data.gamecvs.height;

    ctx.clearRect(0, 0, w, h);
    ctx.save();
    
    ctx.translate(translation.x, translation.y);
    ctx.scale(translation.scale, translation.scale);
    data.boxs.forEach((b: box) => {
        console.log(1);
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.width, b.height);
    })

    ctx.restore();
}

