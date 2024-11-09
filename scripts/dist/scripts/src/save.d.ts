import { Crops } from "./crops";
import { FieldTypes } from "./packs";
export interface SavedFieldsData {
    x: number;
    y: number;
    crop: Crops;
    level: number;
    output: number;
    unlocked: boolean;
    moisture: number;
}
export declare enum SeedMode {
    储存 = 0,
    售卖 = 1
}
export declare const save: {
    fields: {
        [pos: string]: SavedFieldsData;
    };
    money: number;
    seed: number;
    version: string;
    enableCrops: Crops[];
    seeds: {
        type: Crops;
        count: number;
        mode: SeedMode;
    }[];
    knoledge: {
        [key in FieldTypes]: number;
    };
};
export declare function initSaveData(saveData: object): boolean;
