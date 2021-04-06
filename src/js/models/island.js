import Relation from './relation';

export default class Island {
    /**
     * @param {Relation} parentRelation
     */
    constructor(islandController, x, y) {
        this._islandController = islandController;
        this._isSelected = false;
        this._childrenRelations = [];
        this._x = x;
        this._y = y;
    }

    render(canvas) {
        const baseData = {
            layer: true,
            fillStyle: '#000',
            x: this._x,
            y: this._y,
            radius: 5,
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

    addChildIsland(speed, duration, direction) {
        const child = new Island(this._islandController);
        const relation = new Relation(this, child, speed, duration, direction);
        this._childrenRelations.push(relation);
        child.parentRelation = relation;
    }

    getIslandAndChildren() {
        let children = [];

        this._childrenRelations.forEach(relation => {
            children = children.concat(relation.toIsland.getIslandAndChildren());
        });
        
        children.push(this);

        return children;
    }

    set parentRelation(parentRelation) {
        this._parentRelation = parentRelation;
        const islandPos = parentRelation.getToIslandPosition();
        this._x = islandPos.x;
        this._y = islandPos.y;
    }

    get x() {
        return this._x;
    }

    set x(x) {
        if (!this._parentRelation) {
            this._x = x;
        }
    }

    get y() {
        return this._y;
    }

    set y(y) {
        if (!this._parentRelation) {
            this._y = y;
        }
    }

    get isSelected() {
        return this._isSelected;
    }

    /**
     * @param {boolean} isSelected
     */
    set isSelected(isSelected) {
        this._isSelected = isSelected;
    }
}