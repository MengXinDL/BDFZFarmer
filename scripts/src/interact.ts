class eventDetector {
    private _move: ((x: number, y: number) => void)[];
    private _click: ((x: number, y: number) => void)[];
    private _scroll: ((delta: number, altKey: boolean) => void)[];

    pressed = false;
    pressedElement: HTMLElement | null = null;

    private lastX = 0;
    private lastY = 0;
    private startX = 0;
    private startY = 0;
    private startDistance = 0;
    private lastDistance = 0;
    constructor() {
        this._move = [];
        this._click = [];
        this._scroll = [];

        this.initMouse();

        this.initTouch();
    }
    initMouse() {
        document.addEventListener('mousemove', (e: MouseEvent) => {
            requestAnimationFrame(() => {
                this._move.forEach((callback: (x: number, y: number) => void) => {
                    callback(e.movementX, e.movementY);
                })
            })
        });
        document.addEventListener('mousedown', (e: MouseEvent) => {
            this.startX = e.offsetX;
            this.startY = e.offsetY;
            this.pressedElement = e.target as HTMLElement;
            this.pressed = true;
        });
        document.addEventListener('mouseup', (e: MouseEvent) => {
            let x = e.offsetX - this.startX;
            let y = e.offsetY - this.startY;
            if (Math.abs(x) < 5 && Math.abs(y) < 5) {
                this._click.forEach((callback: (x: number, y: number) => void) => {
                    callback(e.offsetX, e.offsetY);
                })
            }
            this.pressedElement = null;
            this.pressed = false;
        });

        //Idea from GaoKai
        document.addEventListener('wheel', (e: WheelEvent) => {
            this._scroll.forEach((callback: (scale: number, altKey: boolean) => void) => {
                callback(1 + e.deltaY / 100, e.altKey);
            })
        })
    }
    initTouch() {
        //To support touch events
        document.addEventListener('touchmove', (e: TouchEvent) => {
            let x = e.touches[0].clientX - this.lastX;
            let y = e.touches[0].clientY - this.lastY;
            this.lastX = e.touches[0].clientX;
            this.lastY = e.touches[0].clientY;

            let distance = this.getTouchDistance(e) - this.lastDistance;
            this.lastDistance = this.getTouchDistance(e);

            if(isNaN(distance)){
                requestAnimationFrame(() => {
                    this._move.forEach((callback: (x: number, y: number) => void) => {
                        callback(x, y);
                    });
                });
            }else if(Math.abs(distance) < 5){
                requestAnimationFrame(() => {
                    this._scroll.forEach((callback: (delta: number, altKey: boolean) => void) => {
                        callback((distance + this.startDistance) / (this.startDistance), false);
                    })
                })
            }
        });
        document.addEventListener('touchstart', (e: TouchEvent) => {
            this.lastX = e.touches[0].clientX;
            this.lastY = e.touches[0].clientY;

            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;

            this.startDistance = this.getTouchDistance(e);
            this.lastDistance = this.getTouchDistance(e);

            this.pressedElement = e.target as HTMLElement;
            this.pressed = true;
        });
        document.addEventListener('touchend', (e: TouchEvent) => {
            this.pressedElement = null;
            this.pressed = false;
        });
    }
    getTouchDistance(event: TouchEvent): number {
        if (event.touches.length < 2) return NaN;
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        return Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
    }
    set move(callback: (x: number, y: number) => void) {
        this._move.push(callback);
    }
    set click(callback: (x: number, y: number) => void) {
        this._click.push(callback);
    }
    set scroll(callback: (delta: number, altKey: boolean) => void) {
        this._scroll.push(callback);
    }
}

export const interact = new eventDetector();