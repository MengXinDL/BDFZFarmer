import Noise from 'noisejs'


export class box {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    constructor(
        x: number,y: number,
        width: number,height: number,
        color: string
    ){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.color=color;
    }
    render() {
        let ctx: CanvasRenderingContext2D = data.gamecvs.getContext('2d') as CanvasRenderingContext2D
        if(ctx === null) {
            return;
        }
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x + 1, this.y + 1, this.width - 1, this.height - 1);
    }
}

export class field {
    x: number;
    y: number;
    fertility: number;
    box: box;
    basicColor: string;
    constructor(
        x: number, y: number,
        fertility: number,
    ){
        this.x = x;
        this.y = y;
        this.fertility = fertility;
        this.basicColor = "#ffb400";
        this.box = new box(
            (x * 50 + translation.x) * translation.scale,
            (y * 50 + translation.y) * translation.scale,
            translation.scale * 50,
            translation.scale * 50,
            rgbtohex(
                parseInt(this.basicColor.slice(1,3), 16) * this.fertility,
                parseInt(this.basicColor.slice(3,5), 16) * this.fertility,
                parseInt(this.basicColor.slice(5,7), 16) * this.fertility
            )
        );
    }
    render() {
        this.box.render();
    }
}


// export const gamecvs: HTMLCanvasElement = document.getElementById('game') as HTMLCanvasElement;
// export let boxs: box[] = [];

export const data: {
    gamecvs: HTMLCanvasElement,
    fields: field[],
    seed: number,
    noise: Noise,
} = {
    gamecvs: document.getElementById('game') as HTMLCanvasElement,
    fields: [],
    seed: Math.random(),
    noise: new window.Noise,
};
data.noise = new window.Noise(data.seed)
export const translation: {x: number, y: number, scale: number} = {
    x: 0,
    y: 0,
    scale: 1
};

export function hextorgb(hex: string): {r: number, g: number, b: number} | null {
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
