
import {
    render, updateAtlas
} from "./render";
import {showNotice} from './notice'
import LZString from 'lz-string';
import db from "./database";
import { version } from "../../statics/version.json";
import {
    data, calcMoisture,
    base64, unbase64
} from "./sharedData";
import { Crops, getCropsOutput, CropConfigs } from "./crops";
import { FieldTypes } from "./packs";



/************************************* 保存与读取 *********************************************** */



addEventListener('load', () => {
    // db.save.deleteData('save').catch(console.error);

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
                        showNotice(
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
    level: number,
    output: number,
    unlocked: boolean,
    moisture: number
}
export enum SeedMode {
    储存,
    售卖
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
    seeds: {type: Crops, count: number, mode: SeedMode}[],
    knoledge: {[key in FieldTypes]: number}
} = {
    fields: {},
    money: 0,
    seed: Math.floor(Math.random() * 1000000000),
    version: VERSION,
    enableCrops: [Crops.None, Crops.Cockscomb],
    seeds: [{type: Crops.None, count: Infinity, mode: SeedMode.储存}, {type: Crops.Cockscomb, count: 1, mode: SeedMode.售卖}],
    knoledge: {
        [FieldTypes.Unknown]: 0,
        [FieldTypes.Desert]: 0,
        [FieldTypes.Barren]: 0,
        [FieldTypes.Saline]: 0,
        [FieldTypes.Regular]: 0,
        [FieldTypes.Nunja]: 0,
        [FieldTypes.Lake]: 0
    }
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

    function v1_1_0() {
        if (!("version" in saveData)) return;
        let v = saveData["version"];
        if (!(typeof v === "string") || !(v.startsWith("1.1."))) return;
        if(!("fields" in saveData)) return;
        let value = d["fields"] as { [pos: string]: SavedFieldsData }, key = 'fields';
        Object.keys(value).forEach((k)=> {
            value[k].moisture = calcMoisture(value[k].x, value[k].y);
        })
    }
    
    function correctField() {
        let key = 'fields';
        for (let f in d[key]) {
            let field = d[key][f];
            if (!("moisture" in field) || (field.moisture === undefined)) field.moisture = calcMoisture(field.x, field.y);
            if (!("unlocked" in field) || (field.unlocked === undefined)) field.unlocked = true;
            if (!("crop" in field) || (field.crop === undefined)) field.crop = Crops.None;
            field.output = getCropsOutput(field.crop, field.moisture);
            if (!("level" in field) || (field.level === undefined)) field.level = 0;
            if (field.unlocked) {
                for (const a of data.around) {
                    let x = a[0] + field.x;
                    let y = a[1] + field.y;
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
    
    function correctSeeds() {
        let key = 'seeds';
        if (!("seeds" in saveData)) d[key] = [{type: Crops.None, count: Infinity, mode: SeedMode.储存}, {type: Crops.Cockscomb, count: 1, mode: SeedMode.售卖}];
        if (!("enableCrops" in saveData)) d.enableCrops = [Crops.None, Crops.Cockscomb];
    }

    function correctKnoledge() {
        let key = 'knoledge';
        if (!("knoledge" in saveData)) d[key] = {
            [FieldTypes.Unknown]: 0,
            [FieldTypes.Desert]: 0,
            [FieldTypes.Barren]: 0,
            [FieldTypes.Saline]: 0,
            [FieldTypes.Regular]: 0,
            [FieldTypes.Nunja]: 0,
            [FieldTypes.Lake]: 0
        };
    }

    function v1_3_() {
        if (!("version" in saveData)) return;
        let v = saveData["version"];
        if (!(typeof v === "string") || !(v.startsWith("1.3."))) return;
        if(!("seeds" in saveData)) return;
        let value = d["seeds"] as {type: Crops, count: number, mode: SeedMode}[];
        value.forEach((s, i) => {
            if(s.type === Crops.GoldenCockscomb && s.count > 1) s.count = 1;
        })
    }

    v0_(); // to support version 0.*.* Array like data
    v1_0_(); // to clear Crockscombs from version 1.0.* 
    v1_1_0(); // to fix moisture
    v1_3_(); // to fix golden cockscombs
    correctField(); // to initialize uninitialized fields config
    correctSeeds(); // to initialize uninitialized seeds
    correctKnoledge(); // to initialize uninitialized knoledge

    console.log('parsed data done\nbefore:');
    console.log(saveData);
    console.log('after:');
    console.log(d);

    Object.assign(save, d);
    save.seeds.forEach((s) => {
        if(s.count === null) s.count = Infinity;
    })
    return s;
}