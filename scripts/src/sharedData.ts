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
}
// export const gamecvs: HTMLCanvasElement = document.getElementById('game') as HTMLCanvasElement;
// export let boxs: box[] = [];

export const data: {
    gamecvs: HTMLCanvasElement,
    boxs: box[],
    perlin: (x: number, y: number) => number,
} = {
    gamecvs: document.getElementById('game') as HTMLCanvasElement,
    boxs: [],
    perlin: new Noise(Math.random()).perlin2,
};