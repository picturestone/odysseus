import DefaultUi from "./uis/defaultUi";
import SelectedIslandUi from "./uis/selectedIslandUi";

export default class UiController {
    constructor(islandController, canvasController) {
        this.$el = $('.js-o-ui');
        this.$zoomIn = $('.js-o-zoom-in');
        this.$zoomOut = $('.js-o-zoom-out');
        this.canvasController = canvasController;
        this.islandController = islandController;
        
        // Resolve circular reference.
        if(this.islandController !== undefined && this.islandController.uiController === undefined) {
            this.islandController.uiController = this;
        }

        this.bindListeners();
    }

    bindListeners() {
        this.$zoomIn.on('click', this.zoomIn.bind(this));
        this.$zoomOut.on('click', this.zoomOut.bind(this));
    }

    zoomIn() {
        this.canvasController.zoomIn();
    }

    zoomOut() {
        this.canvasController.zoomOut();
    }

    showDefault() {
        new DefaultUi(this).show();
    }

    showSelectedIsland(island) {
        new SelectedIslandUi(this, island).show();
    }
}