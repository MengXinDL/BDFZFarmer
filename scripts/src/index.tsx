import {
    save,
    translation,
    data,
    Field,
    calcMoisture,
    Crops, CropsName,
    getFieldConfig,
    pixToBox
} from "./sharedData";
import { interact } from "./interact";
import {
    render, initFields,
} from "./render";
import notice from './notice'



addEventListener('load', () => {
    let mp = document.getElementById('money');
    setInterval(() => {
        let d = 0;
        for (const f in save.fields) {
            if (!save.fields[f].unlocked) continue;
            d += calcMoisture(save.fields[f]);
        }
        save.money += d;
        if (mp) mp.innerText =
            `money: ${save.money.toFixed(2)}
${d.toFixed(2)}/s`;
    }, 1000)
})


interact.click = (x: number, y: number) => {
    if (translation.scale < 0.5) return;

    if (!interact.pressedElement || interact.pressedElement !== data.gamecvs) {
        return;
    }

    let { x: x1, y: y1 } = pixToBox(x, y);

    console.log(x1, y1);

    let f = save.fields[`${x1},${y1}`];
    if (save.fields[`${x1},${y1}`] === undefined) {
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
                moisture: calcMoisture(a[0], a[1]),
                unlocked: false
            }
        }

        initFields();
        render();
    }

    if (!f.unlocked) {
        buyField();
    } else {
        notice('区块信息', {
            text: [`坐标：${x1},${y1}`,
            `含水量：${f.moisture.toFixed(2).slice(2)}`,
            `土地类型：${getFieldConfig(f.moisture).innerText}`,
            `作物：${CropsName[f.crop]}`],
        })
    }
}

addEventListener('load', () => {
    let home = document.getElementById('home') as HTMLButtonElement;
    home.onclick = () => {
        translation.scale = 2;
        translation.x = 0;
        translation.y = 0;
        initFields();
        render();
    }
})