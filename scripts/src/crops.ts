import { TreeNode } from './tree'

export enum Crops {
    None,
    Cockscomb,
    BigCockscomb,
    GoldenCockscomb,
}


interface CropConfig {
    name: string,
    moisture: {
        lo: number,
        mid: number,
        hi: number
    },
    basicOutput: number,
    rarity: CropRarity,
    foreground: Crops[],
    knowledge: number,
    introduction: string,
    node: TreeNode,
}

class Crop implements CropConfig {
    name: string;
    moisture: { lo: number; mid: number; hi: number };
    basicOutput: number;
    rarity: CropRarity;
    foreground: Crops[];
    knowledge: number;
    introduction: string;
    node: TreeNode;

    constructor(
        name: string,
        moisture: { lo: number; mid: number; hi: number },
        basicOutput: number,
        rarity: CropRarity,
        foreground: Crops[],
        knowledge: number,
        introduction: string
    ) {
        this.name = name;
        this.moisture = moisture;
        this.basicOutput = basicOutput;
        this.rarity = rarity;
        this.foreground = foreground;
        this.knowledge = knowledge;
        this.introduction = introduction;
        this.node = new TreeNode();
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
    [CropRarity.Uncommon]: { color: '#0000FF', name: '罕见' },
    [CropRarity.Rare]: { color: '#00FF00', name: '稀有' },
    [CropRarity.Epic]: { color: '#FF0000', name: '史诗' },
    [CropRarity.Legendary]: { color: '#FF00FF', name: '传奇' },}
export const CropConfigs : { [key in Crops]: Crop } = {
    [Crops.None]: new Crop('无', { lo: NaN, mid: NaN, hi: NaN }, 0, CropRarity.Common, [], 0, ''),
    [Crops.Cockscomb]: new Crop('狗尾草', { lo: 0, mid: 0.4, hi: 1 }, 0.5, CropRarity.Common, [], 0, '属禾本科，狗尾草属一年生草本植物。根为须状，高大植株具支持根。秆直立或基部膝曲，高10-100厘米，基部径达3-7毫米。叶鞘松弛，无毛或疏具柔毛或疣毛，边缘具较长的密绵毛状纤毛；有祛风明目，清热利尿的作用。生于海拔4000米以下的荒野、道旁，为旱地作物常见的一种杂草。'),
    [Crops.BigCockscomb]: new Crop('大狗尾草', { lo: -2, mid: 0.75, hi: 1.3 }, 0.6, CropRarity.Common, [Crops.Cockscomb], 10, '是禾本科狗尾草属一年生植物。大狗尾草通常具支柱根；秆粗壮而高大，光滑无毛；叶鞘松弛，叶片线状披针形；圆锥花序紧缩呈圆柱状，顶端尖，花柱基部分离；颖果椭圆形，顶端尖。花果期7-10月。大狗尾草因其穗形得名。'),
    [Crops.GoldenCockscomb]: new Crop('金色狗尾草', { lo: -5, mid: 0.3, hi: 1 }, 1, CropRarity.Rare, [Crops.BigCockscomb], 100, '是一年生草本植物；单生或丛生。秆高可达90厘米，光滑无毛，叶鞘下部扁压具脊，上部圆形，光滑无毛，叶片线状披针形或狭披针形，上面粗糙，下面光滑，圆锥花序紧密呈圆柱状或狭圆锥状，直立，主轴具短细柔毛，刚毛金黄色或稍带褐色，粗糙，第一颖宽卵形或卵形，第二颖宽卵形，第一外稃与小穗等长或微短，第二小花两性，外稃革质，6-10月开花结果。'),
}
Object.values(CropConfigs).forEach(c => 
    c.foreground.forEach(d => {
        CropConfigs[d].node.appendChild(c.node);
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

