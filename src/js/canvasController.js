export default class CanvasController {
    constructor() {
        this.$el = $('.js-o-map');

        this.setCanvasHeightToParent();
        this.bindListeners();
    }

    bindListeners() {
        $(window).on('resize', this.setCanvasHeightToParent.bind(this));
    }

    setCanvasHeightToParent() {
        const $parent = this.$el.parent();
        this.$el.attr('width', $parent.innerWidth() - 50);
        this.$el.attr('height', $parent.innerHeight() - 50);
    }

    render(islands) {
        // Clear the whole canvas
        this.$el.removeLayers(() => true);
        islands.forEach(island => {
            island.render(this.$el);
        });
        this.$el.drawLayers();
    }
}