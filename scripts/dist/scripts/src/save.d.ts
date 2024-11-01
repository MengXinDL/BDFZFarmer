import { Crops } from "./crops";
export interface SavedFieldsData {
    x: number;
    y: number;
    crop: Crops;
    unlocked: boolean;
    moisture: number;
}
export declare const save: {
    fields: {
        [pos: string]: SavedFieldsData;
    };
    money: number;
    seed: number;
    version: string;
    enableCrops: Crops[];
};
export declare function initSaveData(saveData: object): boolean;
