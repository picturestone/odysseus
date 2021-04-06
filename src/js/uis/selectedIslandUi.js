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
        const xString = `${Math.round(this.island.x * 100) / 100} SM`;
        $container.append(this.getStaticProperty('x', xString));
        const yString = `${Math.round(this.island.y * 100) / 100} SM`;
        $container.append(this.getStaticProperty('y', yString));

        // Add button to add islands
        const $newIslandButton = $(`
            <button type="button" class="btn btn-primary">
                Neue abhängige Insel
            </button>
        `);
        $container.append($newIslandButton);
        $newIslandButton.on('click', () => {
            this.islandController.addRelatedIsland(1, 1, 45);
        });
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