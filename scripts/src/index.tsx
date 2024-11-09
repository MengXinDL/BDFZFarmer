import {
    translation,
    data,
    Field, FieldConfigs,
    calcMoisture,
    pixToBox,
    parseNumber,
    getFieldConfig,
} from "./sharedData";
import { interact } from "./interact";
import {
    render, updateAtlas
} from "./render";
import { showNotice, showTip } from './notice'
import {
    CropConfigs, Crops, CropRarityConfigs,
    getCropsOutput
} from "./crops";
import { save, SeedMode } from "./save";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import { FieldTypes } from "./packs";

let currentCrop = Crops.None;
addEventListener('load', () => {
    let mp = document.getElementById('money');
    let knp = document.getElementById('knowledge');
    let sd = createRoot(document.getElementById('seeds') as HTMLElement);
    setInterval(() => {
        let d = 0; // 单位时间总收入
        let mf = save.seeds.filter(s => s.mode === SeedMode.售卖).map(s => s.type); // 售卖模式的种子
        let upd: { [key: number]: number } = {}; // 更新数量的种子
        let k: { [key in FieldTypes]: number } = {
            [FieldTypes.Unknown]: 0,
            [FieldTypes.Desert]: 0,
            [FieldTypes.Saline]: 0,
            [FieldTypes.Barren]: 0,
            [FieldTypes.Regular]: 0,
            [FieldTypes.Nunja]: 0,
            [FieldTypes.Lake]: 0
        }
        for (const f in save.fields) {
            let f1 = save.fields[f];
            if (!f1.unlocked) continue;
            if (mf.includes(f1.crop)) d += f1.output * CropConfigs[f1.crop].basicOutput;
            else upd[f1.crop] = (upd[f1.crop] || 0) + getCropsOutput(f1.crop, f1.moisture) * CropConfigs[f1.crop].seedOutput;
            if(f1.level > 0) k[getFieldConfig(f1.moisture)[1]] += f1.level;
        }
        for (let i in save.seeds) {
            if (save.seeds[i].type in upd) save.seeds[i].count += upd[save.seeds[i].type] / 4;
        }
        save.money += d / 4;
        if (mp) mp.innerText = `货币: ${parseNumber(save.money)}\n${parseNumber(d)}/s`;
        if (knp) knp.innerText = Object.keys(k).map(key => {
            let i = Number(key) as FieldTypes;
            if (i === FieldTypes.Unknown || k[i] === 0) return '';
            return `${FieldConfigs[i].innerText}知识: ${parseNumber(save.knoledge[i] += k[i])}`
        }).filter(s => s !== '').join('\n');
        sd.render(<Seeds />)
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
            showTip(`需要${parseNumber(m)}，但你只有${parseNumber(save.money)}`);
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
                output: 0,
                moisture: calcMoisture(x2, y2),
                unlocked: false
            }
        }

        updateAtlas();
        render();
    }
    if (!f.unlocked) {
        buyField();
    } else if (Date.now() - interact.pressTime > 500) {
        showNotice('区块信息', {
            text: Field.getFieldInformation(f),
        }, false)
    } else if (currentMode === Mode.种植) {
        if (f.crop !== Crops.None) {
            showTip('该区域已有作物');
            return;
        }
        if (f.level > 0) {
            showTip('该区域已有研究所');
            return;
        }
        let s = save.seeds.find(s => s.type === currentCrop);
        if (s === undefined) return;
        if (s.count < 1) return;
        s.count -= 1;
        f.crop = currentCrop;
        f.output = getCropsOutput(f.crop, f.moisture);
        render();
    } else if (currentMode === Mode.建造) {
        if(f.crop !== Crops.None) {
            showTip('该区域已有作物，不能建造研究所');
            return;
        }
        let m = 100 * Math.exp(f.level);
        if (save.money < m) {
            showTip(`你的货币不足，需要${parseNumber(m)}但你只有${parseNumber(save.money)}`);
            return;
        }
        save.money -= m;
        f.level += 1;
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
    种植,
    建造
}
let currentMode = Mode.种植;
function ModeSelector() {
    let [mode, setMode] = useState(Mode.种植);
    function switchMode() {
        currentMode = 1 - currentMode;
        setMode(currentMode);
    }
    return (<button onClick={switchMode}>当前模式：{Mode[mode]}</button>)
}

addEventListener('load', () => {
    let changeMode = createRoot(document.getElementById('switch') as HTMLElement);
    changeMode.render(<ModeSelector />)
})


function Seeds() {
    let box: JSX.Element[] = [];
    save.seeds.forEach((s, i) => {
        let cnt = s.count;
        box.push(
            <span style={{ color: CropRarityConfigs[CropConfigs[s.type].rarity].color, margin: '5px' }} key={i}>
                {CropConfigs[s.type].name}: {s.count === Infinity ? '无限' : `${s.count.toFixed(0)}`}
                <button onClick={() => {
                    let cc = CropConfigs[s.type];
                    let rc = CropRarityConfigs[cc.rarity];
                    showNotice(<><span style={{ color: rc.color }}>{cc.name}</span>种子信息</>, {
                        text: [
                            `名称：${cc.name}`,
                            `前置植物：${cc.foreground.length === 0 ? '无' : cc.foreground.map(f => CropConfigs[f].name).join(',')}`,
                            `产量：${cc.basicOutput}`,
                            `稀有度：${rc.name}`,
                            `介绍：${cc.introduction}`,
                        ]
                    }, false)
                }}>查看详情</button>
                <br />
                <button onClick={() => { s.mode = 1 - s.mode }}>{SeedMode[s.mode] + '模式'}</button>
                <button
                    onClick={() => {
                        if (currentCrop === s.type) return;
                        currentCrop = s.type;
                    }}
                >{currentCrop === s.type ? '使用中' : '使用'}</button>
            </span>
        )
    })
    return <>{box}</>
}


