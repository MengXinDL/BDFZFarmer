import { FieldTypes } from "./packs";

export enum Crops {
    None,

    Cockscomb,
    BigCockscomb,
    GoldenCockscomb,
    WildSingleWheat,
    SingleWheat,
    WildDoubleWheat,
    Aegilops,
    DoubleWheat,
    Wheat,

    GrassRice,
    WildRice,
    // AncientJRice,
    IndicaRice,
    JaponicaRice,
    JIRice, // 粳稻籼稻杂交
}


class Crop {
    id: Crops;
    name: string;
    shortName: string;
    moisture: { lo: number; mid: number; hi: number };
    basicOutput: number;
    seedOutput: number;
    rarity: CropRarity;
    foreground: Crops[];
    nextCrop: Crops[];
    cost: {
        seed: number[],
        knoledge: {[key in FieldTypes]: number},
    };
    posibility: number;
    introduction: string;

    constructor(
        id: Crops,
        name: string,
        shortName: string,
        moisture: { lo: number; mid: number; hi: number },
        basicOutput: number,
        seedOutput: number,
        rarity: CropRarity,
        foreground: Crops[],
        cost: [ number[], [number, number, number, number, number, number]] | null,
        posibility: number,
        introduction: string
    ) {
        this.id = id;
        this.name = name;
        this.shortName = shortName === '' ? name : shortName;
        this.moisture = moisture;
        this.basicOutput = basicOutput;
        this.seedOutput = seedOutput;
        this.rarity = rarity;
        this.foreground = foreground;
        this.nextCrop = [];
        this.introduction = introduction;
        this.cost = {
            seed: new Array(this.foreground.length).fill(0),
            knoledge: {
                [FieldTypes.Unknown]: 0,
                [FieldTypes.Desert]: 0,
                [FieldTypes.Saline]: 0,
                [FieldTypes.Barren]: 0,
                [FieldTypes.Regular]: 0,
                [FieldTypes.Nunja]: 0,
                [FieldTypes.Lake]: 0,
            }
        };
        if (cost) this.cost.seed = cost[0], this.cost.knoledge = {
            [FieldTypes.Unknown]: 0,
            [FieldTypes.Desert]: cost[1][0],
            [FieldTypes.Saline]: cost[1][1],
            [FieldTypes.Barren]: cost[1][2],
            [FieldTypes.Regular]: cost[1][3],
            [FieldTypes.Nunja]: cost[1][4],
            [FieldTypes.Lake]: cost[1][5],
        };
        this.posibility = posibility;
    }
}

export enum CropRarity {
    Common,
    Uncommon,
    Rare,
    Epic,
    Legendary
}
export const CropRarityConfigs: { [key in CropRarity]: { color: string, name: string } } = {
    [CropRarity.Common]: { color: '#FFFFFF', name: '普通' },
    [CropRarity.Uncommon]: { color: '#00FF00', name: '罕见' },
    [CropRarity.Rare]: { color: '#87CEEB', name: '稀有' },
    [CropRarity.Epic]: { color: '#FF7F64', name: '史诗' },
    [CropRarity.Legendary]: { color: '#DC64FF', name: '传奇' },
}
export const CropConfigs : { [key in Crops]: Crop } = {
    //[Crops.]: new Crop(Crops., '', '', { lo: , mid: , hi: }, , , CropRarity., [], [[], [, , , , , ]], ''),
    // 小麦科技树
    [Crops.None]: new Crop(Crops.None, '无', '', { lo: NaN, mid: NaN, hi: NaN }, 0, 0, CropRarity.Common, [], null, 1, ''),
    [Crops.Cockscomb]: new Crop(Crops.Cockscomb, '狗尾草', '', { lo: 0, mid: 0.4, hi: 1 }, 0.5, 0.5, CropRarity.Common, [], null, 1, '属禾本科，狗尾草属一年生草本植物。根为须状，高大植株具支持根。秆直立或基部膝曲，高10-100厘米，基部径达3-7毫米。叶鞘松弛，无毛或疏具柔毛或疣毛，边缘具较长的密绵毛状纤毛；有祛风明目，清热利尿的作用。生于海拔4000米以下的荒野、道旁，为旱地作物常见的一种杂草。'),
    [Crops.BigCockscomb]: new Crop(Crops.BigCockscomb, '大狗尾草', '', { lo: -2, mid: 0.75, hi: 1.3 }, 0.6, 0.6,CropRarity.Common, [Crops.Cockscomb], [[10], [0, 0, 500, 0, 100, 0]], 1, '是禾本科狗尾草属一年生植物。大狗尾草通常具支柱根；秆粗壮而高大，光滑无毛；叶鞘松弛，叶片线状披针形；圆锥花序紧缩呈圆柱状，顶端尖，花柱基部分离；颖果椭圆形，顶端尖。花果期7-10月。大狗尾草因其穗形得名。'),
    [Crops.Aegilops]: new Crop(Crops.Aegilops, '山羊草', '', {lo: 0.2, mid: 0.5, hi: 0.8}, 0.1, 3, CropRarity.Common, [Crops.Cockscomb], [[10],[0, 0, 100, 0, 0, 0]], 1, '山羊草属，禾本科，约25种，产欧洲和亚洲，中国有节节麦 1 种，见于陕西西安及河南新乡等地，可能系一输入种，多生于麦田中或荒芜草地，可用以与小麦进行杂交育种。'),
    [Crops.GoldenCockscomb]: new Crop(Crops.GoldenCockscomb, '金色狗尾草', '', { lo: -5, mid: 0.3, hi: 1 }, 1e4, 0,CropRarity.Legendary, [Crops.Cockscomb, Crops.BigCockscomb], [[10000, 1000], [0, 1e8, 0, 0, 0, 0]], 1, '是一年生草本植物；单生或丛生。秆高可达90厘米，光滑无毛，叶鞘下部扁压具脊，上部圆形，光滑无毛，叶片线状披针形或狭披针形，上面粗糙，下面光滑，圆锥花序紧密呈圆柱状或狭圆锥状，直立，主轴具短细柔毛，刚毛金黄色或稍带褐色，粗糙，第一颖宽卵形或卵形，第二颖宽卵形，第一外稃与小穗等长或微短，第二小花两性，外稃革质，6-10月开花结果。'),
    [Crops.WildSingleWheat]: new Crop(Crops.WildSingleWheat, '野生一粒小麦', '野一小麦', {lo: -1, mid: 0.3, hi: 1}, 1, 1, CropRarity.Uncommon, [Crops.BigCockscomb], [[500], [0, 0, 0, 1e4, 0, 0]], 1, '小麦属中最原始的栽培种。原产小亚细亚。穗小，齐，极紧密，常有芒侧面宽，正面狭。穗轴脆，易折断。每小穗常仅一有芒的花结实，内稃在子粒成熟时纵裂成两片，颖紧密，麦粒不易晚落。晚熟，产量和品质都极差。可用作小麦杂交育种的原始材料。'),
    [Crops.SingleWheat]: new Crop(Crops.SingleWheat, '一粒小麦', '', {lo: -2, mid: 0.4, hi: 1}, 1.5, 1, CropRarity.Uncommon, [Crops.WildSingleWheat], [[100], [0, 0, 1e4, 5e4, 0, 0]], 1, '小麦属中最原始的栽培种。原产小亚细亚。穗小，齐，极紧密，常有芒侧面宽，正面狭。穗轴脆，易折断。每小穗常仅一有芒的花结实，内稃在子粒成熟时纵裂成两片，颖紧密，麦粒不易晚落。晚熟，产量和品质都极差。可用作小麦杂交育种的原始材料。'),
    [Crops.WildDoubleWheat]: new Crop(Crops.WildDoubleWheat, '野生二粒小麦', '野二小麦', {lo: -1, mid: 0.65, hi: 1}, 1, 6, CropRarity.Rare, [Crops.WildSingleWheat, Crops.Aegilops], [[100, 100], [0, 0, 1e4, 5e4, 0, 0]], 1, '二粒小麦是一粒小麦与山羊草杂交不育后代低温忽然染色体加倍形成的一个异源多倍体植物。'),
    [Crops.DoubleWheat]: new Crop(Crops.DoubleWheat, '二粒小麦', '', { lo: -1, mid: 0.45, hi: 1}, 2, 6, CropRarity.Rare, [Crops.WildDoubleWheat], [[1000], [0, 0, 5e4, 1e4, 0, 0]], 1, '二粒小麦是一粒小麦与山羊草杂交不育后代低温忽然染色体加倍形成的一个异源多倍体植物。'),
    [Crops.Wheat]: new Crop(Crops.Wheat, '小麦', '', { lo: -0.5, mid: 0.7, hi: 1}, 7, 10, CropRarity.Epic, [Crops.DoubleWheat, Crops.Aegilops], [[1000, 1000], [0, 0, 5e4, 1e5, 1e4, 0]], 1, '是禾本科、小麦族下的一属，一年或越年生草本。欧、亚大陆和北美广为栽培。约3000年前，二粒小麦与粗山羊草杂交，由于低温，这个杂交种的染色体忽然加倍，形成了具有42个染色体的异源多倍体，即现在栽培的普通小麦。'),

    // [Crops.]: new Crop(Crops., '', '', { lo: , mid: , hi: }, , , CropRarity., [], [[], [, , , , , ]], , ''),
    // 水稻科技树
    [Crops.GrassRice]: new Crop(Crops.GrassRice, '杂草稻', '', { lo: 0.5, mid: 0.8, hi: 2}, 0.1, 0.8, CropRarity.Common, [Crops.Wheat, Crops.GoldenCockscomb], [[1e7, 0], [0, 0, 0, 0, 1e6, 0]], 1, '杂草稻指的是具有杂草特性的水稻，又称野稻、杂稻、再生稻，农民称之为大青棵。其外部形态和水稻极为相似，但在田间具有更旺盛的生长能力，植株一般比较高大。'),
    [Crops.WildRice]: new Crop(Crops.WildRice, '野生稻', '', { lo: 0.5, mid: 0.8, hi: 2}, 0.5, 0.8, CropRarity.Common, [Crops.GrassRice], [[1e4], [0, 0, 0, 0, 5e6, 0]], 1, '野生稻产于中国广东、海南、广西、云南、台湾，除中国外，印度、缅甸、泰国、马来西亚、东南亚等地也有分布。其喜高温、多湿的环境，喜阳光充足，常生长于海拔600米以下的江河流域、平原地区的低湿地。通过播种繁殖。'),
    [Crops.IndicaRice]: new Crop(Crops.IndicaRice, '籼稻', '', { lo: 0.4, mid: 0.85, hi: 3}, 1.5, 1, CropRarity.Uncommon, [Crops.WildRice], [[1e5], [0, 0, 0, 0, 1e6, 1e5]], 0.9, '籼稻，栽培稻的一个亚种，高100厘米左右，较耐湿、耐热和耐强光，但不耐寒。'),
    [Crops.JaponicaRice]: new Crop(Crops.JaponicaRice, '粳稻', '', { lo: 0.3, mid: 0.8, hi: 3}, 2, 1, CropRarity.Uncommon, [Crops.WildRice], [[1e5], [0, 0, 0, 0, 1e6, 1e6]], 0.85, '是禾本科稻属作物亚洲栽培稻的亚种。粳稻具有耐旱、耐寒、耐弱光的习性，株形紧凑、分禁力较弱、茎秆强壮不易倒伏。'),
    [Crops.JIRice]: new Crop(Crops.JIRice, '粳籼杂交稻', '', { lo: 0.35, mid: 0.8, hi: 3}, 3, 1, CropRarity.Rare, [Crops.IndicaRice, Crops.JaponicaRice], [[1e6, 1e6], [0, 0, 0, 0, 5e6, 5e6]], 0.75, '籼粳亚种杂交稻是水稻品种，籽粒强度大、耐压性能好、加工时不易产生碎米、出米率较高、米饭胀性较小。'),

}
Object.values(CropConfigs).forEach(c => 
    c.foreground.forEach(d => {
        CropConfigs[d].nextCrop.push(c.id);
    })
);

export function getCropsOutput(crop: Crops, moisture: number): number {
    function Gaussian(x: number, bias: number, edge: number): number {
        let d = (bias + 2) * (x - edge) / (bias - edge) - 2;
        return Math.exp(- ((d - bias) ** 2));
    }

    let config = CropConfigs[crop];
    if (!config) {
        throw new Error(`unknown crop: ${crop}`);
    }
    if (isNaN(config.moisture.lo) || isNaN(config.moisture.mid) || isNaN(config.moisture.hi)) {
        return 0;
    }
    if (config.moisture.lo > config.moisture.mid || config.moisture.mid > config.moisture.hi) {
        throw new Error(`invalid moisture range: ${config.moisture}`);
    }
    if (moisture < config.moisture.lo || moisture > config.moisture.hi) {
        return 0;
    }
    if (moisture <= config.moisture.mid) {
        return Gaussian(moisture, config.moisture.mid, config.moisture.lo);
    } else {
        return Gaussian(moisture, config.moisture.mid, config.moisture.hi);
    }
}

