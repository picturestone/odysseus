export default class Island {
    constructor(islandController, x, y) {
        this.islandController = islandController;
        this._x = x;
        this._y = y;
    }

    render(canvas) {
        canvas.drawArc({
            fillStyle: '#c33',
            x: this._x,
            y: this._y,
            radius: 5
        });
    }

    get x() {
        return this._x;
    }

    set x(x) {
        this._x = x;
        this.islandController.renderAllIslands();
    }

    get y() {
        return this._y;
    }

    set y(y) {
        this._y = y;
        this.islandController.renderAllIslands();
    }
}