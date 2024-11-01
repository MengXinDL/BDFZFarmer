import Noise from 'noisejs';
import { Crops, CropConfigs, getCropsOutput } from "./crops";
import { save, SavedFieldsData } from "./save";

interface FieldConfig {
    color: string;
    innerText: string;
    range: [number, number];
}
const FieldConfigs: {
    [key: string]: FieldConfig;
} = {
    Unknown: {
        color: "#000000",
        innerText: "未知",
        range: [NaN, NaN]
    },
    Desert: {
        color: "#ffd68f",
        innerText: "沙漠",
        range: [0, 0.1]
    },
    Saline: {
        color: "#ffffff",
        innerText: "盐碱地",
        range: [0.1, 0.3]
    },
    Barren: {
        color: "#c29c0d",
        innerText: "贫瘠地",
        range: [0.3, 0.5]
    },
    Regular: {
        color: "#b56605",
        innerText: "普通土地",
        range: [0.5, 0.7]
    },
    Nunja: {
        color: "#7d710a",
        innerText: "沼泽地",
        range: [0.7, 0.9]
    },
    Lake: {
        color: "#0085e3",
        innerText: "湖泊",
        range: [0.9, 1]
    }
}

export function getFieldConfig(moisture: number): FieldConfig {
    for (let f in FieldConfigs) {
        let fc = FieldConfigs[f];
        if (
            fc.range[0] <= moisture &&
            fc.range[1] > moisture
        ) return fc;
    }
    return FieldConfigs.Unknown;
}

export class box {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    innerText: string;
    constructor(
        x: number, y: number,
        width: number, height: number,
        color: string,
        innerText: string = ""
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.innerText = innerText;
    }
    render() {
        let ctx: CanvasRenderingContext2D = data.gamecvs.getContext('2d') as CanvasRenderingContext2D
        if (ctx === null) {
            return;
        }

        ctx.fillStyle = this.color;
        if (translation.scale > 25) ctx.fillRect(this.x, this.y, this.width, this.height);
        else ctx.fillRect(this.x, this.y, this.width, this.height);

        if (this.innerText === "") {
            return;
        }
        const textLines = this.innerText.split('\n');
        const lineHeight = parseInt(ctx.font, 10);
        const totalHeight = textLines.length * lineHeight;
        const textWidths = textLines.map(line => ctx.measureText(line).width);
        const y = (this.height / 2) - (totalHeight / 2) + lineHeight;
        ctx.fillStyle = this.color === "#ffffff" ? "#000000" : "#ffffff";
        textLines.forEach((line, index) => {
            ctx.fillText(
                line,
                this.x + (this.width / 2) - (textWidths[index] / 2),
                this.y + y + index * lineHeight
            );
        });
    }
}

export class Field {
    x: number;
    y: number;
    moisture: number;
    box: box;
    basicColor: string;
    unlocked: boolean = false;
    constructor(
        x: number, y: number,
        moisture: number,
        unlocked: boolean = false
    ) {
        this.x = x;
        this.y = y;
        this.moisture = moisture;
        this.basicColor = "#ffb400";
        let f = save.fields[`${x},${y}`];
        if (f !== undefined) {
            this.moisture = f.moisture;
            this.unlocked = f.unlocked;
        }
        let txt = "";
        if (translation.scale > 25) {
            if (this.unlocked) {
                txt = getFieldConfig(this.moisture).innerText;
                if (f.crop !== Crops.None) txt += `\n${CropConfigs[f.crop].name}`
            } else {
                let m = Field.calcMoney(this);
                if (m < 10 ** 5) txt =`花费${m}`;
                else if(m < 10 ** 7) txt = `花费${Math.floor(m / 10 ** 3)}k`;
                else txt = `花费${Math.floor(m / 10 ** 6)}M`;
            }
        }
        let p = boxToPix(this.x, this.y);
        this.box = new box(
            p.x, p.y,
            translation.scale,
            translation.scale,
            this.color(),
            txt
        );
    }
    render() {
        this.box.render();
    }
    color() {
        return this.unlocked ?
            getFieldConfig(this.moisture).color
            : "#ffffff7f";
    }
    static calcMoney(f: number | Field, x?: number, y?: number): number {
        if (typeof f !== "number") {
            return Field.calcMoney(f.moisture, f.x, f.y);
        }
        if (x === undefined || y === undefined) {
            throw new Error("x or y is undefined when calcMoney");
        }
        return Math.floor((x * x + y * y) ** 1.4);
    }
    static getFieldInformation(f: Field | SavedFieldsData): string[] {
        let crop = Crops.None;
        if (!(f instanceof Field)) {
            crop = f.crop;
        }
        return [`坐标：${f.x},${f.y}`,
            `含水量：${f.moisture.toFixed(2).slice(2)}`,
            `土地类型：${getFieldConfig(f.moisture).innerText}`,
            `作物：${CropConfigs[crop].name}`,
            `每秒收入：${getCropsOutput(crop, f.moisture).toFixed(2)}`
        ]
    }
}


// export const gamecvs: HTMLCanvasElement = document.getElementById('game') as HTMLCanvasElement;
// export let boxs: box[] = [];

export const data: {
    gamecvs: HTMLCanvasElement,
    fields: Field[],
    noise: Noise,
    around: [number, number][],
    atlas: {
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D | null,
        edge: {
            maxX: number,
            maxY: number
            minX: number,
            minY: number
        },
        enable: boolean
    }
} = {
    gamecvs: document.getElementById('game') as HTMLCanvasElement,
    fields: [],
    noise: new Noise(),
    around: [
        [-1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [1, 0],
        [-1, 1],
        [0, 1],
        [1, 1]
    ],
    atlas: {
        canvas: document.createElement('canvas') as HTMLCanvasElement,
        ctx: null,
        edge: {
            maxX: 0,
            maxY: 0,
            minX: 0,
            minY: 0
        },
        enable: false,
    }
};
data.noise = new Noise(save.seed)
console.log(save.seed);

export const translation: { x: number, y: number, scale: number } = {
    x: 0,
    y: 0,
    scale: 1
};

export function hextorgb(hex: string): { r: number, g: number, b: number } | null {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export function rgbtohex(r: number, g: number, b: number): string {

    let hex = (
        (1 << 24) +
        (Math.floor(r) << 16) +
        (Math.floor(g) << 8) +
        Math.floor(b)
    ).toString(16).slice(1);
    return '#' + hex;
}

export function calcMoisture(f: Field): number;
export function calcMoisture(x: number, y: number): number;
export function calcMoisture(f: SavedFieldsData): number
export function calcMoisture(x: number | SavedFieldsData | Field, y?: number): number {
    let r = 1 / Math.PI / 2;
    if (typeof x === "number") {
        if (y === undefined) return 0;
        let rand = data.noise.perlin2(x * r, y * r);
        rand = (rand + 1) / 2;
        return rand;
    } else {
        return x.moisture;
    }
}



export function base64(str: string): string {
    return btoa(unescape(encodeURIComponent(str)));
}

export function unbase64(str: string): string {
    return decodeURIComponent(escape(atob(str)));
}

export function pixToBox(x: number, y: number) {
    return {
        x: Math.floor(
            (x - translation.x - window.innerWidth / 2) /
            translation.scale
        ),
        y: Math.floor(
            (y - translation.y - window.innerHeight / 2) /
            translation.scale
        ),
    }
}

export function boxToPix(x: number, y: number) {
    return {
        x: x * translation.scale + translation.x + window.innerWidth / 2,
        y: y * translation.scale + translation.y + window.innerHeight / 2,
    }
}