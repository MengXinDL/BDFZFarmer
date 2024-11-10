import { FieldTypes } from "./packs";
export declare enum Crops {
    None = 0,
    Cockscomb = 1,
    BigCockscomb = 2,
    GoldenCockscomb = 3,
    WildSingleWheat = 4,
    SingleWheat = 5,
    WildDoubleWheat = 6,
    Aegilops = 7,
    DoubleWheat = 8,
    Wheat = 9
}
declare class Crop {
    id: Crops;
    name: string;
    shortName: string;
    moisture: {
        lo: number;
        mid: number;
        hi: number;
    };
    basicOutput: number;
    seedOutput: number;
    rarity: CropRarity;
    foreground: Crops[];
    nextCrop: Crops[];
    cost: {
        seed: number[];
        knoledge: {
            [key in FieldTypes]: number;
        };
    };
    introduction: string;
    constructor(id: Crops, name: string, shortName: string, moisture: {
        lo: number;
        mid: number;
        hi: number;
    }, basicOutput: number, seedOutput: number, rarity: CropRarity, foreground: Crops[], cost: [number[], [number, number, number, number, number, number]] | null, introduction: string);
}
export declare enum CropRarity {
    Common = 0,
    Uncommon = 1,
    Rare = 2,
    Epic = 3,
    Legendary = 4
}
export declare const CropRarityConfigs: {
    [key in CropRarity]: {
        color: string;
        name: string;
    };
};
export declare const CropConfigs: {
    [key in Crops]: Crop;
};
export declare function getCropsOutput(crop: Crops, moisture: number): number;
export {};
