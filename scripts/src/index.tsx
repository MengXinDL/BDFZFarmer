import {
    save,
    translation,
    data,
    Field,
    calcMoisture,
    Crops,
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

    let x1 = Math.floor((x - translation.x - window.innerWidth / 2) / translation.scale / 50);
    let y1 = Math.floor((y - translation.y - window.innerHeight / 2) / translation.scale / 50);
    console.log(x1, y1);

    let f = save.fields[`${x1},${y1}`];
    if (save.fields[`${x1},${y1}`] === undefined || f.unlocked) {
        return;
    }

    let m = Field.calcMoney(f.moisture, f.x, f.y);
    if (m > save.money) {
        notice('你钱不够', [`需要${m.toFixed(2)}`, `但你只有${save.money.toFixed(2)}`]);
        return;
    }
    save.money -= m;

    save.fields[`${x1},${y1}`] = {
        x: x1,
        y: y1,
        crop: Crops.None,
        moisture: calcMoisture(x1, y1),
        unlocked: true
    }
    for (const a of data.around) {
        let x2 = a[0] + x1;
        let y2 = a[1] + y1;
        if (!save.fields[`${x2},${y2}`]) {
            save.fields[`${x2},${y2}`] = {
                x: x2,
                y: y2,
                crop: Crops.None,
                moisture: calcMoisture(a[0], a[1]),
                unlocked: false
            }
        }
    }

    initFields();
    render();
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