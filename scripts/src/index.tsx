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
import React, { useState } from "react";
import { FieldTypes } from "./packs";
import event from "./event";

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
            if (f1.level > 0) k[getFieldConfig(f1.moisture)[1]] += 2.8 ** f1.level / 2;
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

        updateSeeds();
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
                level: 0,
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
        if (f.crop !== Crops.None && currentCrop !== Crops.None) {
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
        if (f.crop !== Crops.None) {
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
        box.push(
            <span style={{ color: CropRarityConfigs[CropConfigs[s.type].rarity].color, margin: '5px' }} key={i}>
                {CropConfigs[s.type].name}: {s.count === Infinity ? '无限' : `${parseNumber(s.count, 2, false)}`}
                <br />
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
                }}>详情</button>
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

let seeds: ReturnType<typeof createRoot> | null = null;
const nextSeeds: {
    crop: Crops;
    unlockedForeground: Crops[];
    unfullKnowledge: FieldTypes[];
}[] = [];
function updateSeeds() {
    const n: { [key in 0 | 1 | 2]: React.JSX.Element[] } = {
        0: [],
        1: [],
        2: []
    };
    save.seeds.forEach(sd => {
        CropConfigs[sd.type].nextCrop.forEach(s => {
            if (nextSeeds.find(ns => ns.crop === s) === undefined && !save.enableCrops.includes(s)) {
                nextSeeds.push({
                    crop: s,
                    unlockedForeground: CropConfigs[s].foreground,
                    unfullKnowledge: [0, 1, 2, 3, 4, 5, 6]
                })
            }
        })
    })
    nextSeeds.forEach((s, i) => {
        s.unlockedForeground = s.unlockedForeground.filter(c => !save.enableCrops.includes(c))
        s.unfullKnowledge = s.unfullKnowledge.filter(k => save.knoledge[k] < CropConfigs[s.crop].cost.knoledge[k]);
        if (s.unlockedForeground.length > 0) {
            n[0].push(<NewSeed croptype={s.crop} type={0} key={i} />);
        } else if (s.unfullKnowledge.length > 0) {
            n[1].push(<NewSeed croptype={s.crop} type={1} key={i} />);
        } else {
            n[2].push(<NewSeed croptype={s.crop} type={2} key={i} />);
        }
    })  
    seeds?.render(<>{n[2]}{n[1]}{n[0]}</>);
}

addEventListener('load', () => {
    seeds = createRoot(document.getElementById('new') as HTMLElement)
    event.on('buySeed', (id: Crops) => {
        if (save.enableCrops.includes(id)) return showTip('已种植');
        let enable = true;
        let cc = CropConfigs[id];

        Object.entries(cc.cost.knoledge).forEach(([k, v]) => {
            enable = enable && save.knoledge[Number(k) as FieldTypes] >= v;
        })
        cc.foreground.forEach((f, i) => {
            enable = enable && save.enableCrops.includes(f) && (save.seeds.find(s => s.type === f)?.count || 0) >= cc.cost.seed[i];
        })
        if (!enable) return showTip('种子或知识不足');
        Object.entries(cc.cost.knoledge).forEach(([k, v]) => {
            save.knoledge[Number(k) as FieldTypes] -= v;
        })
        cc.foreground.forEach((f, i) => {
            let k = save.seeds.find($ => $.type === f);
            if (k !== undefined) {
                k.count -= cc.cost.seed[i];
            }
        })
        save.enableCrops.push(id);
        save.seeds.push({ type: id, count: 1, mode: SeedMode.储存 });
        nextSeeds.splice(nextSeeds.findIndex(ns => ns.crop === id), 1);
        console.log(nextSeeds);
        updateSeeds();

    })
})
function NewSeed({ type, croptype }: { type: 0 | 1 | 2, croptype: Crops }) { // 0: 前置植物未全部完成 1: 前置植物全部完成，但没有足够种子或知识 2: 可以解锁
    let cc = CropConfigs[croptype];
    let rc = CropRarityConfigs[cc.rarity];
    let time = React.useRef(0);
    let callback = React.useCallback(() => {
        if (Date.now() - time.current < 500) {
            switch (type) {
                case 0:
                    showTip('前置植物未全部完成');
                    break;
                case 1:
                    showTip('知识不足');
                    break;
                case 2:
                    event.emit('buySeed', cc.id);
            }
        } else {
            showNotice(<><span style={{ color: rc.color }}>{cc.name}</span>种子信息</>, {
                text: [
                    `名称：${cc.name}`,
                    `需要种子：${cc.foreground.length === 0 ? '无' : cc.foreground.map((f, i) => `${CropConfigs[f].name}×${cc.cost.seed[i]}`).join('\n')}`,
                    `需要知识：${cc.foreground.length === 0 ? '无' :
                        Object.entries(cc.cost.knoledge).map(([k, v]) =>
                            k === '0' || v === 0 ? '' :
                            `${FieldConfigs[Number(k) as FieldTypes].innerText}×${v}`
                        ).filter(s => s !== '').join('\n')}`,
                ]
            }, false)
        }
    }, [type, croptype])
    return (
        <span className="newseed" style={{
            color: rc.color,
            backgroundColor: ['#f007', '#ff07', '#fff7'][type],
            borderColor: rc.color,
        }}
            onMouseDown={() => {
                time.current = Date.now();
            }}
            onMouseUp={callback}
        >{cc.name}</span>
    )
}