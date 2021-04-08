import Relation from './relation';

export default class Island {
    constructor(islandController, x, y) {
        this._islandController = islandController;
        this._isSelected = false;
        this._childrenRelations = [];
        this._parentRelation = null;
        this._name = 'Neue Insel';
        this._note = '';
        this._x = x;
        this._y = y;
    }

    render(canvas) {
        const islandRadius = 6;
        const fontSize = 20;

        // Base data for island dot.
        const baseIslandData = {
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
        };

        // Base data for island name.
        const baseTextData = {
            layer: true,
            fillStyle: '#000',
            fontSize: fontSize,
            fontFamily: 'Trebuchet MS, sans-serif',
            text: this._name,
            x: this.x,
            y: (this.y - fontSize),
            cursors: {
                mouseover: 'pointer',
            },
            click: () => {
                this._islandController.selectIsland(this);
            }
        };

        // Special styling for selected island.
        if(this._isSelected) {
            baseIslandData.fillStyle = '#c33';
            baseTextData.fillStyle = '#c33';
        
        }

        // Render arrows between parent island and this island.
        this.renderArrows(canvas, islandRadius);

        // Draw the island dot.
        canvas.drawArc(baseIslandData);

        // Draw the island name.
        canvas.drawText(baseTextData);
    }

    renderArrows(canvas, islandRadius) {
        const arrowColor = 'rgba(0, 0, 0, 0.5)';
        const arrowWidth = 2;
        const arrowLength = 11;
        const arrowAngle = 60;

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
        return child;
    }

    // Deletes this island
    delete() {
        if (this._parentRelation) {
            const indexOfRelationAtParent = this._parentRelation.fromIsland.childrenRelations.indexOf(this._parentRelation);
            this._parentRelation.fromIsland.childrenRelations.splice(indexOfRelationAtParent, 1);
        }
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

    get childrenRelations() {
        return this._childrenRelations;
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

    get note() {
        return this._note;
    }

    set note(note) {
        this._note = note;
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