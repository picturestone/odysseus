import DefaultUi from './uis/defaultUi';
import SelectedIslandUi from './uis/selectedIslandUi';

export default class UiController {
    constructor(islandController, canvasController) {
        this.$el = $('.js-o-ui');
        this.$reset = $('.js-o-reset');
        this.$zoomIn = $('.js-o-zoom-in');
        this.$zoomOut = $('.js-o-zoom-out');
        this.$translateLeft = $('.js-o-translate-left');
        this.$translateRight = $('.js-o-translate-right');
        this.$translateUp = $('.js-o-translate-up');
        this.$translateDown = $('.js-o-translate-down');
        this.canvasController = canvasController;
        this.islandController = islandController;

        // Resolve circular reference.
        if(this.islandController !== undefined && this.islandController.uiController === undefined) {
            this.islandController.uiController = this;
        }

        this.bindListeners();
    }

    bindListeners() {
        this.$reset.on('click', this.canvasController.reset.bind(this.canvasController));
        this.$zoomIn.on('click', this.canvasController.zoomIn.bind(this.canvasController));
        this.$zoomOut.on('click', this.canvasController.zoomOut.bind(this.canvasController));
        this.$translateLeft.on('click', this.canvasController.translateLeft.bind(this.canvasController));
        this.$translateRight.on('click', this.canvasController.translateRight.bind(this.canvasController));
        this.$translateUp.on('click', this.canvasController.translateUp.bind(this.canvasController));
        this.$translateDown.on('click', this.canvasController.translateDown.bind(this.canvasController));
        $(document).on('keydown', this.onKeyDown.bind(this));
    }

    onKeyDown(event) {
        switch (event.key) {
            case '+':
                // Plus pressed
                this.canvasController.zoomIn()
                break;
            case '-':
                // Minus pressed
                this.canvasController.zoomOut()
                break;
            case 'ArrowLeft':
                // Left pressed
                this.canvasController.translateLeft()
                break;
            case 'ArrowRight':
                // Right pressed
                this.canvasController.translateRight()
                break;
            case 'ArrowUp':
                // Up pressed
                this.canvasController.translateUp();
                break;
            case 'ArrowDown':
                // Down pressed
                this.canvasController.translateDown();
                break;
        }
    }

    showDefault() {
        new DefaultUi(this).show();
    }

    showSelectedIsland(island) {
        new SelectedIslandUi(this, island).show();
    }
}