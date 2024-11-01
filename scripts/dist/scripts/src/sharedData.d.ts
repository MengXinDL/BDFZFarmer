import Noise from 'noisejs';
import { Crops } from "./crops";
interface FieldConfig {
    color: string;
    innerText: string;
    range: [number, number];
}
export declare function getFieldConfig(moisture: number): FieldConfig;
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
    constructor(x: number, y: number, moisture: number, unlocked?: boolean);
    render(): void;
    color(): string;
    static calcMoney(f: number | Field, x?: number, y?: number): number;
}
interface SavedFieldsData {
    x: number;
    y: number;
    crop: Crops;
    unlocked: boolean;
    moisture: number;
}
export declare const VERSION: string;
export declare const save: {
    fields: {
        [pos: string]: SavedFieldsData;
    };
    money: number;
    seed: number;
    version: string;
    enableCrops: Crops[];
};
export declare const data: {
    gamecvs: HTMLCanvasElement;
    fields: Field[];
    noise: Noise;
    around: [number, number][];
    atlas: {
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D | null;
        edge: {
            maxX: number;
            maxY: number;
            minX: number;
            minY: number;
        };
        enable: boolean;
    };
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
export declare function base64(str: string): string;
export declare function unbase64(str: string): string;
export declare function initSaveData(saveData: object): boolean;
export declare function pixToBox(x: number, y: number): {
    x: number;
    y: number;
};
export declare function boxToPix(x: number, y: number): {
    x: number;
    y: number;
};
export {};
