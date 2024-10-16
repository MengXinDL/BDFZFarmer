import {
    box, data,
    translation, field,
    hextorgb, rgbtohex,
    save
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



function initFields(){
    data.fields = [];
    let l = translation.scale * 50;
    let r = 1 / Math.PI / 2;
    for(let x = -1; x * l < data.gamecvs.width; x += 1) {
        for(let y = -1; y * l < data.gamecvs.height; y += 1) {
            let x1 = x - Math.floor(translation.x / l);
            let y1 = y - Math.floor(translation.y / l);
            let rand = data.noise.perlin2(x1 * r, y1 * r);
            rand = (rand + 1) / 2;
            data.fields.push(new field(x1, y1, rand));
        }
    }
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

    initFields();

    render();

}


function resize(): void {
    translation.x = translation.y = 0;
    translation.scale = 1;
    data.gamecvs.width = window.innerWidth;
    data.gamecvs.height = window.innerHeight;

    initFields();

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

    ctx.fillStyle = '#539e3b';
    ctx.fillRect(0, 0, w, h);

    data.fields.forEach(f => f.render());

}

function calcFertility(x: number, y: number, l?: number, r?: number): number {
    l = l || translation.scale * 50;
    r = r || 1 / Math.PI / 2;
    let x1 = x - Math.floor(translation.x / l);
    let y1 = y - Math.floor(translation.y / l);
    let rand = data.noise.perlin2(x1 * r, y1 * r);
    rand = (rand + 1) / 2;
    return rand;
}




interact.move = (x: number, y: number) => {
    if(!interact.pressed){
        return;
    }
    if(!interact.pressedElement || interact.pressedElement !== data.gamecvs){
        return;
    }
    translation.x += x;
    translation.y += y;
    initFields();
    render();
}

interact.click = (x: number, y: number) => {
    if(!interact.pressedElement || interact.pressedElement !== data.gamecvs){
        return;
    }
    let x1 = Math.floor((x - translation.x) / translation.scale / 50);
    let y1 = Math.floor((y - translation.y) / translation.scale / 50);
    if(save.fields.some(f => f.x === x1 && f.y === y1)){
        return;
    }
    save.fields.push({
        x: x1,
        y: y1,
        fertility: calcFertility(x1, y1),
    });
    console.log(save);
    initFields();
    render();
}