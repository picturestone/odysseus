import Island from './models/island';

export default class IslandController {
    constructor(canvasController) {
        this.canvasController = canvasController;
        this.parentIslands = [];
        // Set when constructing uiController
        this.uiController = null;
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

    // TODO Returns all islands
    getIslands() {
        let islands = [];

        this.parentIslands.forEach(island => {
            islands = islands.concat(island.getIslandAndChildren());
        });

        return islands;
    }
}