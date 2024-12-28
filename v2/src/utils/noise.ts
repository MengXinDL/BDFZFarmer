import { createNoise2D } from "simplex-noise";
import alea from "alea";

const seeds = {
  seed: Math.round(Math.random() * 10000000),
  moisture: alea(Math.random()),
  temperature: alea(Math.random())
};
setseed(seeds.seed);
console.log("seed", seeds.seed);

const noise = {
  moisture: createNoise2D(seeds.moisture),
  temperature: createNoise2D(seeds.temperature)
};

const moistureScale = 0.0611278593659617;
const temperatureScale = 0.00552341122384621;

// const moistureScale = 0.04;
// const temperatureScale = 0.04;

export function getPosMoisture(x: number, y: number): number {
  return (noise.moisture(x * moistureScale, y * moistureScale) + 1) / 2;
}
export function getPosTemperature(x: number, y: number): number {
  return noise.temperature(x * temperatureScale, y * temperatureScale) * 2.5 + 1.5;
}

export function setseed(seed: number) {
  seeds.moisture = alea((seed << 1) | 708656);
  seeds.temperature = alea((seed >> 1) | 2940212);
}