declare class eventDetector {
    private _move;
    private _click;
    private _scroll;
    pressed: boolean;
    pressedElement: HTMLElement | null;
    curentElement: HTMLElement | null;
    pressTime: number;
    private lastX;
    private lastY;
    private startX;
    private startY;
    private startDistance;
    private lastDistance;
    constructor();
    initMouse(): void;
    initTouch(): void;
    getTouchDistance(event: TouchEvent): number;
    set move(callback: (x: number, y: number) => void);
    set click(callback: (x: number, y: number) => void);
    set scroll(callback: (delta: number, altKey: boolean) => void);
    get scroll(): (delta: number, altKey: boolean) => void;
}
export declare const interact: eventDetector;
export {};
