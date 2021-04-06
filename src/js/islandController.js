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
        this.canvasController.render(this.parentIslands);
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