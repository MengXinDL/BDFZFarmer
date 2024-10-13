import {
    box, data,
    translation, field,
    hextorgb, rgbtohex
} from "./sharedData";
import { interact } from "./interact";

/**
 * Called when the page is loaded. Initializes the canvas and calls
 * {@link init} to set up the canvas and draw the initial frame.
 */
window.onload = function() {
    data.gamecvs = document.getElementById('game') as HTMLCanvasElement;
    init();
}
window.onresize = function() {
    resize();
}



/**
 * Initializes the game. Called once when the page is loaded. Sets up the
 * canvas, sets the initial state of the game, and draws the initial frame.
 */
function init(): void {

    translation.x = translation.y = 0;
    translation.scale = 1;
    data.gamecvs.width = window.innerWidth;
    data.gamecvs.height = window.innerHeight;

    let ctx = data.gamecvs.getContext('2d');

    const basicColor = hextorgb('#ffb400');
    if(basicColor === null) {
        console.error('Invalid color');
        return;
    }

    let l = translation.scale * 50;
    let r = 1 / Math.PI / 2;
    console.log(data.noise.perlin2(1,1), data.noise.perlin2(1,1.0000000001));
    for(let x = 0; x < data.gamecvs.width / l; x += 1) {
        for(let y = 0; y < data.gamecvs.height / l; y += 1) {
            let rand = data.noise.perlin2(x * r, y * r);
            rand = (rand + 1) / 2;
            data.fields.push(new field(x, y, rand));
        }
    }
    console.log(data);

    render();

}


function resize(): void {
    translation.x = translation.y = 0;
    translation.scale = 1;
    data.gamecvs.width = window.innerWidth;
    data.gamecvs.height = window.innerHeight;

    render();
}

/**
 * Draws the current state of the game on the canvas. This function is called
 * once per frame. It clears the canvas, sets the transformation matrix to
 * the current translation and scale, and draws all the boxes in the game.
 */
function render(): void {
    let ctx: CanvasRenderingContext2D = data.gamecvs.getContext('2d') as CanvasRenderingContext2D;
    let w: number = data.gamecvs.width, h: number = data.gamecvs.height;

    ctx.clearRect(0, 0, w, h);
    ctx.save();
    
    ctx.translate(translation.x, translation.y);
    ctx.scale(translation.scale, translation.scale);

    ctx.fillStyle = '#539e3b';
    ctx.fillRect(0, 0, w, h);

    data.fields.forEach((f: field) => {
        f.render();
    })

    ctx.restore();
}

interact.move = (x: number, y: number) => {
    if(!interact.pressed){
        return;
    }
    translation.x += x;
    translation.y += y;
    render();
}