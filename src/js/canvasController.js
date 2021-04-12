export default class CanvasController {
    constructor(islandController) {
        this.$el = $('.js-o-map');
        this.scaleFactor = 0;
        this.translateX = 0;
        this.translateY = 0;
        this.islandController = islandController;

        // Resolve circular reference.
        if(this.islandController !== undefined && this.islandController.canvasController === undefined) {
            this.islandController.canvasController = this;
        }

        this.setCanvasHeightToParent();
        setTimeout(() => { this.setCanvasHeightToParent() }, 100);
        this.bindListeners();
    }

    bindListeners() {
        $(window).on('resize', this.setCanvasHeightToParent.bind(this));
    }

    reset() {
        this.scaleFactor = 0;
        this.translateX = 0;
        this.translateY = 0;
        this.islandController.renderAllIslands();
    }

    zoomIn() {
        this.scaleFactor++;
        this.islandController.renderAllIslands();
    }

    zoomOut() {
        this.scaleFactor--;
        this.islandController.renderAllIslands();
    }

    translateLeft() {
        this.translateX--;
        this.islandController.renderAllIslands();
    }

    translateRight() {
        this.translateX++;
        this.islandController.renderAllIslands();
    }

    translateUp() {
        this.translateY--;
        this.islandController.renderAllIslands();
    }

    translateDown() {
        this.translateY++;
        this.islandController.renderAllIslands();
    }

    setCanvasHeightToParent() {
        const $parent = this.$el.parent();
        this.$el.attr('width', $parent.innerWidth() - 50);
        this.$el.attr('height', $parent.innerHeight() - 50);
        if (this.islandController) {
            this.islandController.renderAllIslands();
        }
    }

    render(islands) {
        // Clear the whole canvas
        this.$el.removeLayers(() => true);
        // Set the current scale
        const scale = Math.pow(1.2, this.scaleFactor);
        this.$el.scaleCanvas({
            layer: true,
            scale 
        });
        // Set the current translate levels
        const translateX = this.translateX * 100;
        const translateY = this.translateY * 100;
        this.$el.translateCanvas({
            layer: true,
            translateX,
            translateY
        });
        // Render everything
        islands.forEach(island => {
            island.render(this.$el);
        });
        // Restore canvas, once for translate, once for zoom
        this.$el.restoreCanvas({
            layer: true
        });
        this.$el.restoreCanvas({
            layer: true
        });
        this.$el.drawLayers();
    }
}