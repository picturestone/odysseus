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
        this.deselectIsland();
        island.isSelected = true;
        this.uiController.showSelectedIsland(island);
        // Rerender islands.
        this.renderAllIslands();
    }

    // Sets all islands to unselected
    deselectIsland() {
        // TODO Get all islands, deselect every island, then set selected for the island from parameter.
        this.parentIslands.forEach(island => {
            island.isSelected = false;
        });
        this.uiController.showDefault();
        // Rerender islands.
        this.renderAllIslands();
    }

    renderAllIslands() {
        this.canvasController.render(this.parentIslands);
    }

    // TODO Returns all islands
    getIslands() {
        
    }
}