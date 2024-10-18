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
addEventListener('load', function() {
    data.gamecvs = document.getElementById('game') as HTMLCanvasElement;
    init();
});
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

    translation.x = window.innerWidth / 2;
    translation.y = window.innerHeight / 2;
    translation.scale = 2;
    data.gamecvs.width = window.innerWidth;
    data.gamecvs.height = window.innerHeight;
    
    const ctx = data.gamecvs.getContext('2d') as CanvasRenderingContext2D;
    ctx.font = `${10 * translation.scale}px sans-serif`;

    save.fields.push({
        x: 0,
        y: 0,
        fertility: calcFertility(0, 0),
    });

    const basicColor = hextorgb('#ffb400');
    if(basicColor === null) {
        console.error('Invalid color');
        return;
    }

    initFields();

    render();

}


function resize(): void {
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
    const ctx: CanvasRenderingContext2D = data.gamecvs.getContext('2d') as CanvasRenderingContext2D;
    let w: number = data.gamecvs.width, h: number = data.gamecvs.height;

    ctx.clearRect(0, 0, w, h);

    if(translation.scale > 0.5)ctx.fillStyle = '#539e3b';
    else ctx.fillStyle = '#294f1d';
    ctx.fillRect(0, 0, w, h);
    
    ctx.font = `${10 * translation.scale}px sans-serif`;

    data.fields.forEach(f => f.render());

}

function calcFertility(x: number, y: number, l?: number, r?: number): number {
    l = l || translation.scale * 50;
    r = r || 1 / Math.PI / 2;
    let rand = data.noise.perlin2(x * r, y * r);
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

interact.scroll = (delta: number) => {
    let r = 1 + delta / 100;
    translation.scale *= r;
    translation.scale = Math.max(0.1, translation.scale);
    translation.scale = Math.min(10, translation.scale);
    initFields();
    render();
}

interact.click = (x: number, y: number) => {
    if(translation.scale < 0.5)return;

    if(!interact.pressedElement || interact.pressedElement !== data.gamecvs){
        return;
    }

    let x1 = Math.floor((x - translation.x) / translation.scale / 50);
    let y1 = Math.floor((y - translation.y) / translation.scale / 50);

    if(save.fields.some(f => f.x === x1 && f.y === y1)){
        return;
    }

    let f = data.fields.find(f => f.x === x1 && f.y === y1);
    if(!f || !f.canBuy){
        return;
    }
    if(field.calcMoney(f) > save.money){
        alert(
`你钱不够
需要${field.calcMoney(f)}
但你只有${save.money.toFixed(2)}
`
        );
        return;
    }
    save.money -= field.calcMoney(f);
    
    save.fields.push({
        x: x1,
        y: y1,
        fertility: calcFertility(x1, y1),
    });
    initFields();
    render();
}