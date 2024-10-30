export declare enum Crops {
    None = 0,
    Corn = 1,
    Cockscomb = 2
}
interface CropsConfig {
    name: string;
    moisture: {
        lo: number;
        mid: number;
        hi: number;
    };
    basicOutput: number;
}
export declare const CropsConfig: {
    [key in Crops]: CropsConfig;
};
export declare function getCropsOutput(crop: Crops, moisture: number): number;
export {};
