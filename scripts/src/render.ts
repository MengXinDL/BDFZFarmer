import {
    box, data,
    translation, Field,
    hextorgb, rgbtohex,
    save, initSaveData, base64, unbase64,
    calcMoisture,
    Crops
} from "./sharedData";
import { interact } from "./interact";
import notice from './notice'
import version from '../../statics/version.json'
import db from "./database";

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



export function initFields() {
    data.fields = [];
    let l = translation.scale * 50;
    let r = 1 / Math.PI / 2;
    for (let x = -1; x * l < data.gamecvs.width; x += 1) {
        for (let y = -1; y * l < data.gamecvs.height; y += 1) {
            let x1 = x - Math.floor((translation.x + data.gamecvs.width / 2) / l);
            let y1 = y - Math.floor((translation.y + data.gamecvs.height / 2) / l);
            if (save.fields[`${x1},${y1}`] === undefined) continue;
            let rand = data.noise.perlin2(x1 * r, y1 * r);
            rand = (rand + 1) / 2;
            data.fields.push(new Field(x1, y1, rand));
        }
    }
}

/**
 * Initializes the game. Called once when the page is loaded. Sets up the
 * canvas, sets the initial state of the game, and draws the initial frame.
 */
async function init(): Promise<void> {

    translation.x = 0;
    translation.y = 0;
    translation.scale = 2;
    data.gamecvs.width = window.innerWidth;
    data.gamecvs.height = window.innerHeight;
    
    const ctx = data.gamecvs.getContext('2d') as CanvasRenderingContext2D;
    ctx.font = `${10 * translation.scale}px sans-serif`;

    let s;
    try {
        s = await db.save.getData('save');
    } catch (e) {
        s = null;
    }
    // 为读取旧版本存档
    if (localStorage.getItem('save')) {
        let _s = localStorage.getItem('save') as string;
        if(! initSaveData(JSON.parse(unbase64(_s)))){
            notice(`新版本：${version.version}!`, version.details)
        }
        db.save.addData('save', save);
        localStorage.removeItem('save');
    } else if (s !== null) {
        if(! initSaveData(s)){
            notice(`新版本：${version.version}!`, version.details)
        }
    } else {
        save.fields['0,0'] = {
            x: 0,
            y: 0,
            crop: Crops.None,
            unlocked: true,
            moisture: calcMoisture(0, 0)
        }
        for (const a of data.around) {
            save.fields[`${a[0]},${a[1]}`] = {
                x: a[0],
                y: a[1],
                crop: Crops.None,
                unlocked: false,
                moisture: calcMoisture(a[0], a[1])
            }
        }
        db.save.addData('save', save);
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
export function render(): void {
    const ctx: CanvasRenderingContext2D = data.gamecvs.getContext('2d') as CanvasRenderingContext2D;
    let w: number = data.gamecvs.width, h: number = data.gamecvs.height;

    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = '#294f1d';
    ctx.fillRect(0, 0, w, h);
    
    ctx.font = `${10 * translation.scale}px sans-serif`;

    data.fields.forEach(f => f.render());

}
interact.move = (x: number, y: number) => {
    if (!interact.pressed) {
        return;
    }
    if (!interact.pressedElement || interact.pressedElement !== data.gamecvs) {
        return;
    }
    translation.x += x;
    translation.y += y;
    initFields();
    render();
}

interact.scroll = (scale: number) => {

    if (interact.pressed && interact.pressedElement !== data.gamecvs) {
        return;
    }
    if (interact.curentElement !== data.gamecvs) {
        return;
    }

    let s = translation.scale;
    translation.scale *= scale;
    translation.scale = Math.max(0.1, translation.scale);
    translation.scale = Math.min(10, translation.scale);
    s = translation.scale / s;
    translation.x *= s;
    translation.y *= s;
    initFields();
    render();
}

