class eventDetector {
    private _move: ((x: number, y: number) => void)[];
    private _click: ((x: number, y: number) => void)[];
    pressed = false;
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
    }
    set move(callback: (x: number, y: number) => void) {
        this._move.push(callback);
    }
    set click(callback: (x: number, y: number) => void) {
        this._click.push(callback);
    }
}

export  const interact = new eventDetector();