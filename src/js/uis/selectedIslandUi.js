export default class SelectedIslandUi {
    constructor(uiController, island) {
        this.uiController = uiController;
        this.$el = uiController.$el;
        this.islandController = uiController.islandController;
        this.island = island;
    }

    show() {
        this.$el.empty();

        // Add relative container.
        const $container = $(`
            <div class="position-relative d-flex flex-column align-items-stretch o-selected-island-ui-container"></div>
        `);
        this.$el.append($container);

        // Add close icon on top left
        const $closeIcon = $(`
            <i class="fas fa-times fa-2x position-absolute top-0 end-0"></i>
        `);
        $container.append($closeIcon);
        $closeIcon.on('click', () => {
            this.islandController.deselectIsland();
        });

        // Add island name
        $container.append($(`
            <h4 class="pe-5">Name</h4>
        `));

        // Add current state of island
        $container.append(this.getStaticProperty('x', this.island.x));
        $container.append(this.getStaticProperty('y', this.island.y));
    }

    getStaticProperty(name, value) {
        return $(`
            <div class="d-flex justify-content-between">
                <p>${name}</p>
                <p>${value}</p>
            </div>
        `);
    }
}