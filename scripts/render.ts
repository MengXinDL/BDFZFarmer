window.onload = function() {
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
    let gamecvs: HTMLCanvasElement = document.getElementById('game') as HTMLCanvasElement;
    let ctx = gamecvs.getContext('2d');
}

function resize(): void {
    let gamecvs: HTMLCanvasElement = document.getElementById('game') as HTMLCanvasElement;

    translation.x = translation.y = 0;
    translation.scale = 1;
    gamecvs.width = window.innerWidth;
    gamecvs.height = window.innerHeight;
}

function render(): void {
    let gamecvs: HTMLCanvasElement = document.getElementById('game') as HTMLCanvasElement;

    let ctx: CanvasRenderingContext2D = gamecvs.getContext('2d') as CanvasRenderingContext2D;
    let w: number = gamecvs.width, h: number = gamecvs.height;

    ctx.clearRect(0, 0, w, h);
    ctx.save();
    
    ctx.translate(translation.x, translation.y);
    ctx.scale(translation.scale, translation.scale);

    ctx.restore();
}