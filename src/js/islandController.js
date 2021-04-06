import Island from './models/island';

export default class IslandController {
    constructor(canvasController, uiController) {
        this.parentIslands = [];
        this.uiController = uiController;
        this.canvasController = canvasController;

        // Resolve circular reference.
        if(this.uiController !== undefined && this.uiController.islandController === undefined) {
            this.uiController.islandController = this;
        }
        if(this.canvasController !== undefined && this.canvasController.islandController === undefined) {
            this.canvasController.islandController = this;
        }
    }

    addIsland(x, y) {
        this.parentIslands.push(new Island(this, x, y));
        this.renderAllIslands();
    }

    addRelatedIsland(speed, duration, direction) {
        const selectedIsland = this.getSelectedIsland();
        if (selectedIsland) {
            this.getSelectedIsland().addChildIsland(speed, duration, direction);
            this.renderAllIslands();
        }
    }

    getSelectedIsland() {
        const islands = this.getIslands();
        let selected = null;
        let i = 0;

        while(i < islands.length && !selected) {
            if(islands[i].isSelected) {
                selected = islands[i];
            }
            i++;
        }

        return selected;
    }

    selectIsland(island) {
        this.deselectIsland(false);
        island.isSelected = true;
        this.uiController.showSelectedIsland(island);
        // Rerender islands.
        this.renderAllIslands();
    }

    // Sets all islands to unselected
    deselectIsland(isRendering = true) {
        const islands = this.getIslands();
        islands.forEach(island => {
            island.isSelected = false;
        });
        this.uiController.showDefault();
        // Rerender islands.
        if (isRendering) {
            this.renderAllIslands();
        }
    }

    renderAllIslands() {
        this.canvasController.render(this.getIslands());
    }

    // Recalculates the position of this island and all children after relation to parent changed.
    recalculatePositions(island) {
        // Update positions of island and all sub islands
        island.getIslandAndChildren().forEach(subIsland => {
            subIsland.recalculatePosition();
        });
        // Rerender islands.
        this.renderAllIslands();
    }

    getIslands() {
        let islands = [];

        this.parentIslands.forEach(island => {
            islands = islands.concat(island.getIslandAndChildren());
        });

        return islands;
    }
}