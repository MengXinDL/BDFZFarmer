class eventDetector {
    private _move: ((x: number, y: number) => void)[];
    private _click: ((x: number, y: number) => void)[];
    pressed = false;
    private startX = 0;
    private startY = 0;
    constructor() {
        this._move = [];
        this._click = [];


        document.addEventListener('mousemove', (e: MouseEvent) => {
            this._move.forEach((callback: (x: number, y: number) => void) => {
                callback(e.movementX, e.movementY);
            })
        });
        document.addEventListener('click', (e: MouseEvent) => {
            this._click.forEach((callback: (x: number, y: number) => void) => {
                callback(e.offsetX, e.offsetY);
            })
        });
        document.addEventListener('mousedown', (e: MouseEvent) => {
            this.pressed = true;
        });
        document.addEventListener('mouseup', (e: MouseEvent) => {
            this.pressed = false;
        });


        //To support touch events
        document.addEventListener('touchmove', (e: TouchEvent) => {
            this._move.forEach((callback: (x: number, y: number) => void) => {
                callback(e.touches[0].clientX - this.startX, e.touches[0].clientY - this.startY);
            })
        });
        document.addEventListener('touchstart', (e: TouchEvent) => {
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
            this.pressed = true;
        });
        document.addEventListener('touchend', (e: TouchEvent) => {
            if (Math.abs(e.changedTouches[0].clientX - this.startX) < 5 && Math.abs(e.changedTouches[0].clientY - this.startY) < 5) {
                this._click.forEach((callback: (x: number, y: number) => void) => {
                    callback(e.touches[0].clientX, e.touches[0].clientY);
                })
            }
            this.pressed = false;
        });
    }
    set move(callback: (x: number, y: number) => void) {
        this._move.push(callback);
    }
    set click(callback: (x: number, y: number) => void) {
        this._click.push(callback);
    }
}

export  const interact = new eventDetector();