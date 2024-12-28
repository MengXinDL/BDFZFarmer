export enum Temperatures {
  NONE = 0,
  FROZEN = 1 << 0,        // 冰冻 (极寒)
  COLD = 1 << 1,          // 寒冷 (寒冷)
  WARM = 1 << 2,          // 温暖 (温暖)
  HOT = 1 << 3,           // 炎热 (炎热)
  BURNING = 1 << 4,       // 灼热 (极热)
}

export enum Moistures {
  NONE = 0,
  ARID = 1 << 0,          // 干旱 (干旱)
  DRY = 1 << 1,           // 干燥 (干旱)
  NORMAL = 1 << 2,        // 适中 (适中)
  WET = 1 << 3,           // 潮湿 (湿润)
  FLOODED = 1 << 4,       // 水浸 (湿润)
}

export enum LandTypes {
  NONE = 0,

  // 极寒地带 (FROZEN)
  FROZEN_ARID = (1 << 16) | 1,       // 永久冻土
  FROZEN_DRY = (1 << 16) | 2,        // 冰丘地
  FROZEN_NORMAL = (1 << 16) | 4,     // 碎冰原
  FROZEN_WET = (1 << 16) | 8,        // 冰川
  FROZEN_FLOODED = (1 << 16) | 16,   // 冰盖

  // 寒冷地带 (COLD)
  COLD_ARID = (1 << 17) | 1,         // 岩石荒地
  COLD_DRY = (1 << 17) | 2,          // 碎石地
  COLD_NORMAL = (1 << 17) | 4,       // 冷土地
  COLD_WET = (1 << 17) | 8,          // 泥泞地
  COLD_FLOODED = (1 << 17) | 16,     // 寒带沼泽

  // 温暖地带 (WARM)
  WARM_ARID = (1 << 18) | 1,         // 砂砾地
  WARM_DRY = (1 << 18) | 2,          // 黄土高地
  WARM_NORMAL = (1 << 18) | 4,       // 红土地
  WARM_WET = (1 << 18) | 8,          // 沼泽地
  WARM_FLOODED = (1 << 18) | 16,     // 泥滩

  // 炎热地带 (HOT)
  HOT_ARID = (1 << 19) | 1,          // 沙漠
  HOT_DRY = (1 << 19) | 2,           // 戈壁
  HOT_NORMAL = (1 << 19) | 4,        // 盐碱地
  HOT_WET = (1 << 19) | 8,           // 泥沼
  HOT_FLOODED = (1 << 19) | 16,      // 湖泊

  // 灼热地带 (BURNING)
  BURNING_ARID = (1 << 20) | 1,      // 熔岩地
  BURNING_DRY = (1 << 20) | 2,       // 火山灰地
  BURNING_NORMAL = (1 << 20) | 4,    // 硫磺地
  BURNING_WET = (1 << 20) | 8,       // 热泉地
  BURNING_FLOODED = (1 << 20) | 16   // 地热泉
}

export interface ILand {
  position: [number, number],
  type: LandTypes,
  moisture: number,
  temperature: number,
}

export interface ILandInfo {
  color: number,
  name: string,
  description: string,
}