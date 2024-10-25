import {
    save,
    translation,
    data,
    Field,
    calcMoisture,
    Crops,
    base64, unbase64, initSaveData,
    VERSION,
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
        for (const f of data.fields) {
            d += calcMoisture(f);
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
    const s = document.getElementById('save');
    const l = document.getElementById('load');
    const a = document.createElement('a');
    const i = document.createElement('input') as HTMLInputElement;
    i.type = 'file';
    i.addEventListener('change', (event) => {
        const fileInput = event.target as HTMLInputElement;
        const file = fileInput.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const content = e.target?.result as string;
                try {
                    initSaveData(JSON.parse(unbase64(content)))
                    initFields();
                    render();
                } catch (error) {
                    console.error('加载失败\nError parsing JSON:', error);
                }
            };

            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            };

            reader.readAsText(file);
        }
    })
    if (s && l) {
        s.onclick = () => {
            let obj = JSON.parse(JSON.stringify(save));
            obj.version = VERSION;
            const content = base64(JSON.stringify(obj));
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);

            a.href = url;
            a.download = 'farmer.save';
            a.click();

            URL.revokeObjectURL(url);
        }
        l.onclick = () => {
            i.click();
            initFields();
            render();
        }
    }
});

setInterval(() => {
    localStorage.setItem('save', base64(JSON.stringify(save)));
}, 10000);

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