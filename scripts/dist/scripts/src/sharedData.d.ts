import Noise from 'noisejs';
import { SavedFieldsData } from "./save";
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
    static getFieldInformation(f: SavedFieldsData): string[];
}
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
export declare function pixToBox(x: number, y: number): {
    x: number;
    y: number;
};
export declare function boxToPix(x: number, y: number): {
    x: number;
    y: number;
};
export declare const collectionCalc: {
    union: (arr1: any[], arr2: any[]) => any[];
    difference: (arr1: any[], arr2: any[]) => any[];
    intersection: (arr1: any[], arr2: any[]) => any[];
};
export declare function parseNumber(num: number, toFixed?: number): string;
export {};
