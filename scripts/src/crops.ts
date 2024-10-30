export enum Crops {
    None,
    Corn,
    Cockscomb,
}

interface CropsConfig {
    name: string,
    moisture: {
        lo: number,
        mid: number,
        hi: number
    },
    basicOutput: number
}
export const CropsConfig : { [key in Crops]: CropsConfig } = {
    [Crops.None]: {
        name: '无',
        moisture: {
            lo: NaN,
            mid: NaN,
            hi: NaN
        },
        basicOutput: 0
    },
    [Crops.Corn]: {
        name: '玉米',
        moisture: {
            lo: 0.3,
            mid: 0.5,
            hi: 0.7,
        },
        basicOutput: 1
    },
    [Crops.Cockscomb]: {
        name: '狗尾草',
        moisture: {
            lo: 0,
            mid: 0.5,
            hi: 1,
        },
        basicOutput: 0.5
    }
}

export function getCropsOutput(crop: Crops, moisture: number): number {
    //-----not done yet------
    return moisture;
    //-----------------------
    function Gaussian(x: number, bias: number, edge: number) : number {
        let d = (bias + 2) * (x - edge) / (bias - edge) -2;
        return Math.exp(- ((d - bias) ** 2));
    }

    let config = CropsConfig[crop];
    if (!config) {
        throw new Error(`unknown crop: ${crop}`);
    }
    if(isNaN(config.moisture.lo) || isNaN(config.moisture.mid) || isNaN(config.moisture.hi)) {
        return 0;
    }
    if(config.moisture.lo > config.moisture.mid || config.moisture.mid > config.moisture.hi) {
        throw new Error(`invalid moisture range: ${config.moisture}`);
    }
    if (moisture < config.moisture.lo || moisture > config.moisture.hi) {
        return 0;
    }
    if(moisture <= config.moisture.mid) {
        return Gaussian(moisture, config.moisture.mid, config.moisture.lo) * config.basicOutput;
    }else {
        return Gaussian(moisture, config.moisture.mid, config.moisture.hi) * config.basicOutput;
    }
}