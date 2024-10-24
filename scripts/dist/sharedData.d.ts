import Noise from 'noisejs';
export declare class box {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    innerText: string;
    constructor(x: number, y: number, width: number, height: number, color: string, innerText?: string);
    render(): void;
}
export declare class Field {
    x: number;
    y: number;
    moisture: number;
    box: box;
    basicColor: string;
    unlocked: boolean;
    canBuy: boolean;
    constructor(x: number, y: number, moisture: number, unlocked?: boolean);
    render(): void;
    color(): string;
    static calcMoney(f: number | Field, x?: number, y?: number): number;
}
interface SavedFieldsData {
    x: number;
    y: number;
    crop: number;
}
export declare const VERSION = "0.2.12";
export declare const save: {
    fields: SavedFieldsData[];
    money: number;
    seed: number;
};
export declare const data: {
    gamecvs: HTMLCanvasElement;
    fields: Field[];
    noise: Noise;
    around: [number, number][];
};
export declare const translation: {
    x: number;
    y: number;
    scale: number;
};
export declare function hextorgb(hex: string): {
    r: number;
    g: number;
    b: number;
} | null;
export declare function rgbtohex(r: number, g: number, b: number): string;
export declare function calcMoisture(f: Field): number;
export declare function calcMoisture(x: number, y: number): number;
export declare function calcMoisture(f: SavedFieldsData): number;
export declare enum Crops {
    corn = 0
}
export declare function base64(str: string): string;
export declare function unbase64(str: string): string;
export declare function parseData(data: object): object;
export {};
