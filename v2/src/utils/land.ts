import { LandTypes, Temperatures, Moistures } from '@/types/land'
import { TEMPERATURE_RANGE, MOISTURE_RANGE } from '@/constant/land'
import { getPosTemperature, getPosMoisture } from './noise';

// 使用位运算组合温度和湿度
export function combineLandType(temp: Temperatures, moisture: Moistures): number {
  if (temp === Temperatures.NONE || moisture === Moistures.NONE) {
    return LandTypes.NONE;
  }
  return (temp << 16) | moisture;
}
// 从组合值中获取温度
export function getTemperature(landType: number): Temperatures {
  return (landType >> 16) & 0xFFFF;
}

// 从组合值中获取湿度
export function getMoisture(landType: number): Moistures {
  return landType & 0xFFFF;
}

export function getLandTypeFromValues(temperature: number, moisture: number): LandTypes {
  let temp: Temperatures = Temperatures.NONE
  let moist: Moistures = Moistures.NONE
  for (let [tempType, [min, max]] of Object.entries(TEMPERATURE_RANGE)) {
    if (temperature >= min && temperature < max) {
      temp = Number(tempType) as Temperatures;
      break;
    }
  }

  for (let [moistType, [min, max]] of Object.entries(MOISTURE_RANGE)) {
    if (moisture >= min && moisture < max) {
      moist = Number(moistType) as Moistures;
      break;
    }
  }

  return combineLandType(temp, moist)
}

export function getLandTypeFromPos(x: number, y: number): LandTypes {
  return getLandTypeFromValues(getPosTemperature(x, y), getPosMoisture(x, y))
}