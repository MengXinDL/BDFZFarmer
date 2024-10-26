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
import LZString from 'lz-string';
import db from "./database";

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


/************************************* 保存与读取 *********************************************** */



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
                const content = new Uint8Array(e.target?.result as ArrayBuffer);
                try {
                    initSaveData(JSON.parse(unbase64(LZString.decompressFromUint8Array(content))));
                } catch (error1) {
                    try {
                        initSaveData(JSON.parse(unbase64(new TextDecoder('ascii').decode(content))));
                    }catch (error2) {
                        notice(
                            '无法读取的存档',
                            [
                                '请确认存档文件是否损坏',
                                'error when reading as text: ' + error2,
                                'error when reading as binary: ' + error1
                            ]
                        );
                    }
                } finally {
                    fileInput.value = '';
                    initFields();
                    render();
                }
            };

            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            };

            reader.readAsArrayBuffer(file);
        }
    })
    if (s && l) {
        s.onclick = () => {
            const content = base64(JSON.stringify(save));
            const blob = new Blob([LZString.compressToUint8Array(content)], { type: 'application/octet-stream' });
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
    db.save.updateData('save', save);
}, 10000);
