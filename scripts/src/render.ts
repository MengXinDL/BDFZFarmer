import { box, data } from "./sharedData";

window.onload = function() {
    data.gamecvs = document.getElementById('game') as HTMLCanvasElement;
    init();
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

    translation.x = translation.y = 0;
    translation.scale = 1;
    data.gamecvs.width = window.innerWidth;
    data.gamecvs.height = window.innerHeight;

    let ctx = data.gamecvs.getContext('2d');

    const basicColor = {r: 255, g: 255, b: 255};

    let l = translation.scale * 50;
    console.log(data.perlin(1,1), data.perlin(1,1.0000000001));
    for(let x = 0; x < data.gamecvs.width; x += l) {
        for(let y = 0; y < data.gamecvs.height; y += l) {
            let rand = data.perlin(x / (l << 10), y / (l << 10));
            data.boxs.push(
                new box(x+1, y+1, l-2, l-2, 
                    rgbtohex(
                        basicColor.r * rand,
                        basicColor.g * rand,
                        basicColor.b * rand
                    )
                )
            );
        }
    }

    render();

}

function rgbtohex(r: number, g: number, b: number): string {
    
    let hex = (
        (1 << 24) +
        (Math.floor(r) << 16) +
        (Math.floor(g) << 8) +
        Math.floor(b)
    ).toString(16).slice(1);
    return '#' + hex;
}
function hextorgb(hex: string): {r: number, g: number, b: number} | null {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function resize(): void {
    translation.x = translation.y = 0;
    translation.scale = 1;
    data.gamecvs.width = window.innerWidth;
    data.gamecvs.height = window.innerHeight;

    render();
}

function render(): void {
    let ctx: CanvasRenderingContext2D = data.gamecvs.getContext('2d') as CanvasRenderingContext2D;
    let w: number = data.gamecvs.width, h: number = data.gamecvs.height;

    ctx.clearRect(0, 0, w, h);
    ctx.save();
    
    ctx.translate(translation.x, translation.y);
    ctx.scale(translation.scale, translation.scale);
    data.boxs.forEach((b: box) => {
        if(ctx === null) {
            return;
        }
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.width, b.height);
    })

    ctx.restore();
}

