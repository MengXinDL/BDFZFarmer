import { exp, xor } from "three/tsl";

export type EventType = 'move' | 'click';

export type MoveEvent = (x: number, y: number) => void;
export type ClickEvent = (x: number, y: number) => void;

export type EventCallback = MoveEvent | ClickEvent;