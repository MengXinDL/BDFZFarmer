
import {
    render, updateAtlas
} from "./render";
import notice from './notice'
import LZString from 'lz-string';
import db from "./database";
import { version } from "../../statics/version.json";
import {
    data, calcMoisture,
    base64, unbase64
} from "./sharedData";
import { Crops } from "./crops";




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
                    } catch (error2) {
                        notice(
                            '无法读取的存档',
                            {
                                text: [
                                    '请确认存档文件是否损坏',
                                    'error when reading as text: ' + error2,
                                    'error when reading as binary: ' + error1
                                ]
                            }
                        );
                    }
                } finally {
                    fileInput.value = '';
                    updateAtlas();
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

            render();
        }
    }
});

setInterval(() => {
    db.save.updateData('save', save);
}, 10000);


export interface SavedFieldsData {
    x: number,
    y: number,
    crop: Crops,
    unlocked: boolean,
    moisture: number
}

const VERSION = version;
export const save: {
    fields: {
        [pos: string]: SavedFieldsData
    },
    money: number,
    seed: number,
    version: string,
    enableCrops: Crops[],
} = {
    fields: {},
    money: 0,
    seed: Math.floor(Math.random() * 1000000000),
    version: VERSION,
    enableCrops: [Crops.None, Crops.Cockscomb]
}

export function initSaveData(saveData: object) {
    let d = JSON.parse(JSON.stringify(saveData));
    let s = false;

    data.noise.seed(d.seed || save.seed);
    console.log(`readed version ${d.version ? d.version : "unknown"}`);
    console.log(`current version ${VERSION}`);
    s = d.version == VERSION;
    d.version = VERSION;

    function v0_() { //to support version 0.2.11 data
        if (!("fields" in saveData)) return;
        let value = saveData["fields"];
        let key = 'fields';
        if (value instanceof Array) {
            let v: { [pos: string]: SavedFieldsData } = {};
            for (const f of value as SavedFieldsData[]) {
                v[`${f.x},${f.y}`] = f;
            }
            d[key] = v;
        }
        for (let f in d[key]) {
            if (!("moisture" in d[key][f]) || (d[key][f].moisture === undefined)) d[key][f].moisture = calcMoisture(d[key][f].x, d[key][f].y);
            if (!("unlocked" in d[key][f]) || (d[key][f].unlocked === undefined)) d[key][f].unlocked = true;
            if (!("crop" in d[key][f]) || (d[key][f].crop === undefined)) d[key][f].crop = Crops.None;
            if (d[key][f].unlocked) {
                for (const a of data.around) {
                    let x = a[0] + d[key][f].x;
                    let y = a[1] + d[key][f].y;
                    if (!d[key][`${x},${y}`]) {
                        d[key][`${x},${y}`] = {
                            x, y,
                            crop: Crops.None,
                            unlocked: false,
                            moisture: calcMoisture(x, y)
                        }
                    }
                }
            }
        }

    }

    function v1_0_() {
        if (!("version" in saveData)) return;
        let v = saveData["version"];
        if (!(typeof v === "string") || !(v.startsWith("1.0."))) return;
        if(!("fields" in saveData)) return;
        let value = d["fields"] as { [pos: string]: SavedFieldsData }, key = 'fields';
        Object.keys(value).forEach((k) => {
            d[key][k].crop = Crops.None;
        })
    }


    v0_(); // to support version 0.*.* Array like data
    v1_0_(); // to clear Crockscombs from version 1.0.* 


    console.log('parsed data done\nbefore:');
    console.log(saveData);
    console.log('after:');
    console.log(d);

    Object.assign(save, d);
    return s;
}