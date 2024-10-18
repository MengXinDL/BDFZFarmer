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
    constructor() {
        this._move = [];
        this._click = [];
        this._scroll = [];


        document.addEventListener('mousemove', (e: MouseEvent) => {
            this._move.forEach((callback: (x: number, y: number) => void) => {
                callback(e.movementX, e.movementY);
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
            this._scroll.forEach((callback: (delta: number, altKey: boolean) => void) => {
                callback(e.deltaY, e.altKey);
            })
        })


        //To support touch events
        document.addEventListener('touchmove', (e: TouchEvent) => {
            let x = e.touches[0].clientX - this.lastX;
            let y = e.touches[0].clientY - this.lastY;
            this.lastX = e.touches[0].clientX;
            this.lastY = e.touches[0].clientY;
            this._move.forEach((callback: (x: number, y: number) => void) => {
                callback(x, y);
            })
        });
        document.addEventListener('touchstart', (e: TouchEvent) => {
            this.lastX = e.touches[0].clientX;
            this.lastY = e.touches[0].clientY;
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
            this.pressedElement = e.target as HTMLElement;
            this.pressed = true;
        });
        document.addEventListener('touchend', (e: TouchEvent) => {
            let x = e.changedTouches[0].clientX - this.startX;
            let y = e.changedTouches[0].clientY - this.startY;
            if (Math.abs(x) < 5 && Math.abs(y) < 5) {
                this._click.forEach((callback: (x: number, y: number) => void) => {
                    callback(x + this.lastX, y + this.lastY);
                })
            }
            this.pressedElement = null;
            this.pressed = false;
        });
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

export  const interact = new eventDetector();