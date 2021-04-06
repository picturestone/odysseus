export default class DefaultUi {
    constructor(uiController) {
        this.$el = uiController.$el;
        this.islandController = uiController.islandController;
    }

    show() {
        this.$el.empty();

        // Add container.
        const $container = $(`
            <div class="d-flex flex-column align-items-start"></div>
        `);
        this.$el.append($container);

        const $newIslandButton = $(`
            <button type="button" class="btn btn-primary mb-3">
                Neue unabhängige Insel
            </button>
        `);
        $container.append($newIslandButton);
        $newIslandButton.on('click', () => {
            this.islandController.addIsland(200, 200);
        });

        const $saveLoadContainer = $(`
            <div class="d-flex"></div>
        `);
        $container.append($saveLoadContainer);

        $saveLoadContainer.append($(`
            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#saveModal">
                Speichern
            </button>
        `));

        $saveLoadContainer.append($(`
            <button type="button" class="btn btn-secondary ms-3" data-bs-toggle="modal" data-bs-target="#loadModal">
                Laden
            </button>
        `));
    }
}