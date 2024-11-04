import {
    translation,
    data,
    Field,
    calcMoisture,
    pixToBox,
} from "./sharedData";
import { interact } from "./interact";
import {
    render, updateAtlas
} from "./render";
import notice from './notice'
import { Crops, getCropsOutput} from "./crops";
import { save } from "./save";
import { createRoot } from "react-dom/client";
import { useState } from "react";


addEventListener('load', () => {
    let mp = document.getElementById('money');
    setInterval(() => {
        let d = 0;
        for (const f in save.fields) {
            if (!save.fields[f].unlocked) continue;
            d += getCropsOutput(
                save.fields[f].crop,
                save.fields[f].moisture
            );
        }
        save.money += d / 4;
        if (mp) mp.innerText =
            `货币: ${save.money.toFixed(2)}
${d.toFixed(2)}/s`;
    }, 250)
})


interact.click = (x: number, y: number) => {
    if (translation.scale < 25) return;

    if (!interact.pressedElement || interact.pressedElement !== data.gamecvs) {
        return;
    }

    let { x: x1, y: y1 } = pixToBox(x, y);

    let f = save.fields[`${x1},${y1}`];
    if (f === undefined) {
        return;
    }

    function buyField() {
        let m = Field.calcMoney(f.moisture, f.x, f.y);
        if (m > save.money) {
            notice('你钱不够', {
                text: [`需要${m.toFixed(2)}`, `但你只有${save.money.toFixed(2)}`]
            });
            return;
        }
        save.money -= m;
        save.fields[`${x1},${y1}`].unlocked = true;
        for (const a of data.around) {
            let x2 = a[0] + x1;
            let y2 = a[1] + y1;
            save.fields[`${x2},${y2}`] = save.fields[`${x2},${y2}`] || {
                x: x2,
                y: y2,
                crop: Crops.None,
                moisture: calcMoisture(x2, y2),
                unlocked: false
            }
        }

        updateAtlas();        
        render();
    }
    if (!f.unlocked) {
        buyField();
    } else if(currentMode === Mode.查看) {
        notice('区块信息', {
            text: Field.getFieldInformation(f),
        }, false)
    } else if(currentMode === Mode.种植) {
        f.crop = Crops.Cockscomb;
        render();
    }
}

addEventListener('load', () => {
    let home = document.getElementById('home') as HTMLButtonElement;
    home.onclick = () => {
        translation.scale = 100;
        translation.x = 0;
        translation.y = 0;
        data.atlas.enable = false;
        
        render();
    }
    let thumbnail = document.getElementById('thumbnail') as HTMLButtonElement;
    thumbnail.onclick = () => {
        
        let s = 5 / translation.scale;
        translation.scale = 5;
        translation.x *= s;
        translation.y *= s;
        data.atlas.enable = true;
        
        render();
    }
})
enum Mode {
    查看,
    种植,
}
let currentMode = Mode.查看;
function ModeSelector() {
    let [mode, setMode] = useState(Mode.查看);
    function switchMode() {
        currentMode = (mode + 1) % 2;
        setMode((mode + 1) % 2);
    }
    return (<button onClick={switchMode}>切换模式：{Mode[mode]}</button>)
}

addEventListener('load', () => {
    let changeMode = createRoot(document.getElementById('switch') as HTMLElement);
    changeMode.render(<ModeSelector/>)
})