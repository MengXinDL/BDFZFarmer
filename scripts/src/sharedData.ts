import Noise from 'noisejs'


enum fieldColor {
    "#ffffff",
    "#d1a20a",
    "#a35d1d",
    "#a3330e",
    "#613400"
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
        if(translation.scale > 0.5)ctx.fillRect(this.x + 1, this.y + 1, this.width - 1, this.height - 1);
        else ctx.fillRect(this.x, this.y, this.width, this.height);

        if(this.innerText === "") {
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

export class field {
    x: number;
    y: number;
    fertility: number;
    box: box;
    basicColor: string;
    unlocked: boolean = false;
    canBuy: boolean = false;
    constructor(
        x: number, y: number,
        fertility: number,
        unlocked: boolean = false
    ) {
        this.x = x;
        this.y = y;
        this.fertility = fertility;
        this.basicColor = "#ffb400";
        let f = save.fields.find(f => f.x === x && f.y === y);
        if (f !== undefined) {
            this.fertility = f.fertility;
            this.unlocked = true;
        }
        if (f === undefined) {
            for (const a of data.around) {
                if (this.canBuy) break;
                save.fields.some(field => {
                    if (
                        field.x === a[0] + this.x &&
                        field.y === a[1] + this.y
                    ) {
                        this.canBuy = true;
                        return true;
                    }
                    return false;
                });
            }
        }
        let txt = "";
        if(translation.scale > 0.5){
            if(this.unlocked) {
                txt =
`(${this.x}, ${this.y})
肥沃度${(this.fertility * 100).toFixed(0)}`;
            }else if(this.canBuy) {
                txt =
`(${this.x}, ${this.y})
肥沃度${(this.fertility * 100).toFixed(0)}
花费${field.calcMoney(this)}`;
            }
        }
        this.box = new box(
            x * 50 * translation.scale + translation.x,
            y * 50 * translation.scale + translation.y,
            translation.scale * 50,
            translation.scale * 50,
            this.color(),
            txt
        );
    }
    render() {
        if(
            !this.canBuy && !this.unlocked &&
            translation.scale < 0.5
        ) return;
        this.box.render();
    }
    color() {
        return this.unlocked ?
            fieldColor[
            Math.floor(this.fertility * 5)
            ]
            : (this.canBuy ? "#7f7f7f7f" : "#0000007f");
    }
    static calcMoney(f: number | field,x?: number, y?: number): number {
        if(typeof f !== "number"){
            return field.calcMoney(f.fertility, f.x, f.y);
        }
        if(x === undefined || y === undefined){
            throw new Error("x or y is undefined when calcMoney");
        }
        return Math.floor(
            (f + 1) *
            (x ** 2 + y ** 2) ** 1.3
        );
    }
}


// export const gamecvs: HTMLCanvasElement = document.getElementById('game') as HTMLCanvasElement;
// export let boxs: box[] = [];

interface savedFieldsData {
    x: number,
    y: number,
    fertility: number,
}

export const save: {
    fields: savedFieldsData[],
    money: number,
    seed: number
} = {
    fields: [],
    money: 0,
    seed: Math.floor(Math.random() * 1000000000),
}

export const data: {
    gamecvs: HTMLCanvasElement,
    fields: field[],
    noise: Noise,
    around: [number, number][],
} = {
    gamecvs: document.getElementById('game') as HTMLCanvasElement,
    fields: [],
    noise: new window.Noise,
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
};
data.noise = new window.Noise(save.seed)
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
