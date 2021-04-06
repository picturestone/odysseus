export default class Island {
    constructor(islandController, x, y) {
        this._x = x;
        this._y = y;
        this._islandController = islandController;
        this._isSelected = false;
    }

    render(canvas) {
        const baseData = {
            layer: true,
            fillStyle: '#000',
            x: this._x,
            y: this._y,
            radius: 30,
            cursors: {
                mouseover: 'pointer',
            },
            click: () => {
                this._islandController.selectIsland(this);
            }
        }

        if(this._isSelected) {
            baseData.fillStyle = '#c33';
        }

        canvas.drawArc(baseData);
    }

    get x() {
        return this._x;
    }

    set x(x) {
        this._x = x;
    }

    get y() {
        return this._y;
    }

    set y(y) {
        this._y = y;
    }

    /**
     * @param {boolean} isSelected
     */
    set isSelected(isSelected) {
        this._isSelected = isSelected;
    }
}