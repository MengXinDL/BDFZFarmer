import { LandTypes, Moistures, Temperatures } from "@/types/land"
import type { ILandInfo } from "@/types/land"

export const LAND_INFOS: {
  [key in LandTypes]: ILandInfo
} = {
  [LandTypes.NONE]: {
    color: 0xffffff,
    name: '无',
    description: '未知或错误的土地类型',
  },

  [LandTypes.FROZEN_ARID]: {
    color: 0xf5ffde,
    name: '永久冻土',
    description: '永久的冻土，完全不会解冻，没有任何作物可以在此种植',
  },
  [LandTypes.FROZEN_DRY]: {
    color: 0x56ffe5,
    name: '冰丘地',
    description: '冰丘地，完全不会解冻，可以种植一些耐寒的杂草',
  },
  [LandTypes.FROZEN_NORMAL]: {
    color: 0x7affd0,
    name: '碎冰原',
    description: '碎冰原，完全不会解冻，可以种植一些耐寒的杂草',
  },
  [LandTypes.FROZEN_WET]: {
    color: 0x80eaff,
    name: '冰川',
    description: '冰川，完全不会解冻，可以种植一些耐寒的杂草',
  },
  [LandTypes.FROZEN_FLOODED]: {
    color: 0xd2f7ff,
    name: '冰盖',
    description: '冰盖，完全不会解冻，可以种植一些耐寒的杂草',
  },

  [LandTypes.COLD_ARID]: {
    color: 0x6d6d6d,
    name: '岩石荒地',
    description: '岩石荒地，寒冷干燥，土地坚硬，可以种植一些耐寒的杂草',
  },
  [LandTypes.COLD_DRY]: {
    color: 0x80715d,
    name: '碎石地',
    description: '碎石地，寒冷干燥，土地坚硬，可以种植一些耐寒的杂草',
  },
  [LandTypes.COLD_NORMAL]: {
    color: 0x9d794a,
    name: '冷土地',
    description: '冷土地，天气寒冷，但是土地适宜，可以种植一些耐寒的作物',
  },
  [LandTypes.COLD_WET]: {
    color: 0x654a10,
    name: '泥泞地',
    description: '泥泞地，天气寒冷，土地湿润，可以种植一些耐寒的喜水作物',
  },
  [LandTypes.COLD_FLOODED]: {
    color: 0x3c3f07,
    name: '寒带沼泽',
    description: '寒带沼泽，天气寒冷，土地泥泞，可以种植一些耐寒的喜水作物',
  },

  [LandTypes.WARM_ARID]: {
    color: 0xc4b570,
    name: '砂砾地',
    description: '砂砾地，温暖干燥，土地破碎坚硬，适合种植一些耐旱的作物',
  },
  [LandTypes.WARM_DRY]: {
    color: 0xad9500,
    name: '黄土高地',
    description: '黄土高地，温暖干燥，土地较干燥，适合种植一些耐旱的作物',
  },
  [LandTypes.WARM_NORMAL]: {
    color: 0xad3900,
    name: '红土地',
    description: '红土地，天气温暖，土地肥沃，适合种植多种温带作物',
  },
  [LandTypes.WARM_WET]: {
    color: 0x484f00,
    name: '沼泽地',
    description: '沼泽地，天气温暖，土地泥泞多水，适合种植多种喜温喜水作物',
  },
  [LandTypes.WARM_FLOODED]: {
    color: 0x421600,
    name: '泥滩',
    description: '泥滩，天气温暖，土地几乎覆水，适合种植多种喜温半水生作物',
  },

  [LandTypes.HOT_ARID]: {
    color: 0xc7a304,
    name: '沙漠',
    description: '沙漠，炎热干燥，土地沙化，适合种植耐旱耐干的作物',
  },
  [LandTypes.HOT_DRY]: {
    color: 0xfffcde,
    name: '盐碱地',
    description: '盐碱地，炎热干燥，土地盐碱，适合种植耐盐作物',
  },
  [LandTypes.HOT_NORMAL]: {
    color: 0xfff36e,
    name: '热带平原',
    description: '热带平原，天气炎热，土地肥沃，适合种植多种热带作物',
  },
  [LandTypes.HOT_WET]: {
    color: 0x595000,
    name: '泥沼',
    description: '泥沼，天气炎热，土地泥泞多水，适合种植多种喜温喜水作物',
  },
  [LandTypes.HOT_FLOODED]: {
    color: 0x2a4209,
    name: '沼泽',
    description: '沼泽，天气炎热，土地几乎覆水，适合种植多种喜温水生作物',
  },

  [LandTypes.BURNING_ARID]: {
    color: 0xc45108,
    name: '熔岩地',
    description: '熔岩地，灼热干燥，土地熔岩，无法种植作物',
  },
  [LandTypes.BURNING_DRY]: {
    color: 0x909197,
    name: '火山灰地',
    description: '火山灰地，灼热干燥，土地火山灰，无法种植作物',
  },
  [LandTypes.BURNING_NORMAL]: {
    color: 0xeaea50,
    name: '硫磺地',
    description: '硫磺地，天气灼热，土地肥沃，无法种植作物',
  },
  [LandTypes.BURNING_WET]: {
    color: 0x6897ba,
    name: '热泉地',
    description: '热泉地，天气灼热，土地泥泞多水，无法种植作物',
  },
  [LandTypes.BURNING_FLOODED]: {
    color: 0x0046ba,
    name: '地热泉',
    description: '地热泉，天气灼热，土地覆水，无法种植作物',
  },
}


export const MOISTURE_RANGE: {
  [key in Moistures]: [number, number]
} = {
  [Moistures.NONE]: [NaN, NaN],

  [Moistures.ARID]: [0, 0.2],
  [Moistures.DRY]: [0.2, 0.4],
  [Moistures.NORMAL]: [0.4, 0.6],
  [Moistures.WET]: [0.6, 0.8],
  [Moistures.FLOODED]: [0.8, 1],
}

export const TEMPERATURE_RANGE: {
  [key in Temperatures]: [number, number]
} = {
  [Temperatures.NONE]: [NaN, NaN],

  [Temperatures.FROZEN]: [-1, 0],
  [Temperatures.COLD]: [0, 1],
  [Temperatures.WARM]: [1, 2],
  [Temperatures.HOT]: [2, 3],
  [Temperatures.BURNING]: [3, 4],
}