import Island from "./models/island";

export default class IslandController {
    constructor(canvasController) {
        this.canvasController = canvasController;
        this.parentIslands = [];
    }

    addIsland(x, y) {
        this.parentIslands.push(new Island(this, x, y));
        this.renderAllIslands();
    }

    renderAllIslands() {
        this.canvasController.render(this.parentIslands);
    }
}