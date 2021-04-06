import Relation from './relation';

export default class Island {
    constructor(islandController, x, y) {
        this._islandController = islandController;
        this._isSelected = false;
        this._childrenRelations = [];
        this._parentRelation = null;
        this._name = 'Neue Insel';
        this._x = x;
        this._y = y;
    }

    render(canvas) {
        const islandRadius = 6;

        const baseData = {
            layer: true,
            fillStyle: '#000',
            x: this._x,
            y: this._y,
            radius: islandRadius,
            cursors: {
                mouseover: 'pointer',
            },
            click: () => {
                this._islandController.selectIsland(this);
            }
        }

        if(this._isSelected) {
            baseData.fillStyle = '#c33';

            this.renderArrows(canvas, islandRadius);
        }

        canvas.drawArc(baseData);
    }

    renderArrows(canvas, islandRadius) {
        const arrowColor = 'rgba(0, 0, 0, 0.5)';
        const arrowWidth = 2;
        const arrowLength = 11;
        const arrowAngle = 60;

        // Add arrows to related islands
        if (this._parentRelation) {
            const arrowTarget = this._parentRelation.getIslandArrowPosition(islandRadius);
            const x2 = arrowTarget.x;
            const y2 = arrowTarget.y
            canvas.drawLine({
                layer: true,
                strokeStyle: arrowColor,
                strokeWidth: arrowWidth,
                rounded: true,
                endArrow: true,
                arrowRadius: arrowLength,
                arrowAngle: arrowAngle,
                x1: this._parentRelation.fromIsland.x,
                y1: this._parentRelation.fromIsland.y,
                x2,
                y2
            });
        }

        this._childrenRelations.forEach(relation => {
            const arrowTarget = relation.getIslandArrowPosition(islandRadius);
            const x2 = arrowTarget.x;
            const y2 = arrowTarget.y
            canvas.drawLine({
                layer: true,
                strokeStyle: arrowColor,
                strokeWidth: arrowWidth,
                rounded: true,
                endArrow: true,
                arrowRadius: arrowLength,
                arrowAngle: arrowAngle,
                x1: this._x,
                y1: this._y,
                x2,
                y2
            });
        });
    }

    addChildIsland(speed, duration, direction) {
        const child = new Island(this._islandController);
        const relation = new Relation(this, child, speed, duration, direction);
        this._childrenRelations.push(relation);
        child.parentRelation = relation;
    }

    getIslandAndChildren() {
        let children = [];

        children.push(this);

        this._childrenRelations.forEach(relation => {
            children = children.concat(relation.toIsland.getIslandAndChildren());
        });

        return children;
    }

    // Recalculates the position depending on the parent island.
    recalculatePosition() {
        if (this._parentRelation) {
            const islandPos = this._parentRelation.getToIslandPosition();
            this._x = islandPos.x;
            this._y = islandPos.y;
        }
    }

    get parentRelation() {
        return this._parentRelation;
    }

    set parentRelation(parentRelation) {
        this._parentRelation = parentRelation;
        this.recalculatePosition();
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

    get islandController() {
        return this._islandController;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
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