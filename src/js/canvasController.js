export default class CanvasController {
    constructor(islandController) {
        this.$el = $('.js-o-map');
        this.setCanvasHeightToParent();
        this.scaleFactor = 0;
        this.islandController = islandController;

        // Resolve circular reference.
        if(this.islandController !== undefined && this.islandController.canvasController === undefined) {
            this.islandController.canvasController = this;
        }

        this.bindListeners();
    }

    bindListeners() {
        $(window).on('resize', this.setCanvasHeightToParent.bind(this));
    }

    zoomIn() {
        this.scaleFactor++;
        this.islandController.renderAllIslands();
    }

    zoomOut() {
        this.scaleFactor--;
        this.islandController.renderAllIslands();
    }

    setCanvasHeightToParent() {
        const $parent = this.$el.parent();
        this.$el.attr('width', $parent.innerWidth() - 50);
        this.$el.attr('height', $parent.innerHeight() - 50);
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
        // Render everything
        islands.forEach(island => {
            island.render(this.$el);
        });
        // Restore canvas
        this.$el.restoreCanvas({
            layer: true
        });
        this.$el.drawLayers();
    }
}