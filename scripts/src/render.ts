import {
    data,
    translation, Field,
    unbase64,
    calcMoisture,
    getFieldConfig,
    boxToPix,
} from "./sharedData";
import { interact } from "./interact";
import {showNotice} from './notice'
import version from '../../statics/version.json'
import db from "./database";
import { Crops } from "./crops";
import { initSaveData, save } from "./save";


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
    let l = translation.scale;
    let r = 1 / Math.PI / 2;
    for (let x = -1; x * l < data.gamecvs.width; x += 1) {
        for (let y = -1; y * l < data.gamecvs.height; y += 1) {
            let x1 = x - Math.floor((translation.x + data.gamecvs.width / 2) / l);
            let y1 = y - Math.floor((translation.y + data.gamecvs.height / 2) / l);
            if (save.fields[`${x1},${y1}`] === undefined) continue;
            data.fields.push(new Field(x1, y1, save.fields[`${x1},${y1}`].moisture));
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
    translation.scale = 100;
    data.gamecvs.width = window.innerWidth;
    data.gamecvs.height = window.innerHeight;
    
    const ctx = data.gamecvs.getContext('2d') as CanvasRenderingContext2D;
    ctx.font = `${translation.scale / 5}px sans-serif`;
    ctx.imageSmoothingEnabled = false;

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
            showNotice(`新版本：${version.version}!`, { text: version.details })
        }
        db.save.addData('save', save);
        localStorage.removeItem('save');
    } else if (s !== null) {
        if(! initSaveData(s)){
            showNotice(`新版本：${version.version}!`, { text: version.details })
        }
    } else {
        save.fields['0,0'] = {
            x: 0,
            y: 0,
            crop: Crops.None,
            output: 0,
            level: 0,
            unlocked: true,
            moisture: calcMoisture(0, 0)
        }
        for (const a of data.around) {
            save.fields[`${a[0]},${a[1]}`] = {
                x: a[0],
                y: a[1],
                crop: Crops.None,
                output: 0,
                level: 0,
                unlocked: false,
                moisture: calcMoisture(a[0], a[1])
            }
        }
        db.save.addData('save', save);
        
    }
    
    updateAtlas();
    render();

}

export function updateAtlas() {
    (data.gamecvs.getContext('2d') as CanvasRenderingContext2D).imageSmoothingEnabled = false;
    data.atlas.ctx = data.atlas.canvas.getContext('2d') as CanvasRenderingContext2D;
    let c = data.atlas.ctx;
    let e = data.atlas.edge;
    for(const i in save.fields){
        let f = save.fields[i];
        e.maxX = Math.max(e.maxX, f.x);
        e.maxY = Math.max(e.maxY, f.y);
        e.minX = Math.min(e.minX, f.x);
        e.minY = Math.min(e.minY, f.y);
    }
    data.atlas.canvas.width = e.maxX - e.minX + 1;
    data.atlas.canvas.height = e.maxY - e.minY + 1;

    c.fillStyle = '#294f1d';
    c.fillRect(0, 0, data.atlas.canvas.width, data.atlas.canvas.height);
    for(const i in save.fields){
        let f = save.fields[i];
        let x = f.x - e.minX;
        let y = f.y - e.minY;
        if(f.unlocked) c.fillStyle = getFieldConfig(f.moisture).color;
        else c.fillStyle = '#ffffff7f';
        c.fillRect(x, y, 1, 1);
    }
}

function resize(): void {
    data.gamecvs.width = window.innerWidth;
    data.gamecvs.height = window.innerHeight;

    

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
    
    ctx.font = `${translation.scale / 5}px sans-serif`;

    if(data.atlas.enable){
        let { x, y } = boxToPix(data.atlas.edge.minX, data.atlas.edge.minY);
        ctx.drawImage(data.atlas.canvas,
            0, 0, data.atlas.canvas.width, data.atlas.canvas.height,
            x, y,
            data.atlas.canvas.width * translation.scale,
            data.atlas.canvas.height * translation.scale,
        );
        return;
    }

    initFields();

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
    
    render();
}

interact.scroll = (scale: number, altKey: boolean) => {
    
    if (!altKey && interact.pressed && interact.pressedElement !== data.gamecvs) {
        return;
    }
    if (!altKey && interact.curentElement !== data.gamecvs) {
        return;
    }

    let s = 1 / translation.scale;
    translation.scale *= scale;
    translation.scale = Math.max(5, translation.scale);
    translation.scale = Math.min(500, translation.scale);
    s *= translation.scale;
    translation.x *= s;
    translation.y *= s;
    
    data.atlas.enable = translation.scale < 25;

    render();
}

addEventListener('load', () => {
    let bigger = document.getElementById('bigger') as HTMLButtonElement;
    let smaller = document.getElementById('smaller') as HTMLButtonElement;
    bigger.onclick = () => {
        interact.scroll(50,true);
    }
    smaller.onclick = () => {
        interact.scroll(-33,true);
    }
})