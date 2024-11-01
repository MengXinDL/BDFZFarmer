import { TreeNode } from './tree';
export declare enum Crops {
    None = 0,
    Cockscomb = 1,
    BigCockscomb = 2,
    GoldenCockscomb = 3
}
interface CropConfig {
    name: string;
    moisture: {
        lo: number;
        mid: number;
        hi: number;
    };
    basicOutput: number;
    foreground: Crops[];
    introduction: string;
    node: TreeNode;
}
declare class Crop implements CropConfig {
    name: string;
    moisture: {
        lo: number;
        mid: number;
        hi: number;
    };
    basicOutput: number;
    foreground: Crops[];
    introduction: string;
    node: TreeNode;
    constructor(name: string, moisture: {
        lo: number;
        mid: number;
        hi: number;
    }, basicOutput: number, foreground: Crops[], introduction: string);
}
export declare const CropConfigs: {
    [key in Crops]: Crop;
};
export declare function getCropsOutput(crop: Crops, moisture: number): number;
export {};