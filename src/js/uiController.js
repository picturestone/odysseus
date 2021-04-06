import DefaultUi from "./uis/defaultUi";
import SelectedIslandUi from "./uis/selectedIslandUi";

export default class UiController {
    constructor(islandController) {
        this.$el = $('.js-o-ui');
        this.islandController = islandController;
        // Set for circular reference.
        this.islandController.uiController = this;
    }

    showDefault() {
        new DefaultUi(this).show();
    }

    showSelectedIsland(island) {
        new SelectedIslandUi(this, island).show();
    }
}