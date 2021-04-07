import * as bootstrap from 'bootstrap';

export default class DefaultUi {
    constructor(uiController) {
        this.uiController = uiController;
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

        const $loadButton = $(`
            <button type="button" class="btn btn-secondary ms-3">
                Laden
            </button>
        `);
        $saveLoadContainer.append($loadButton);
        $loadButton.on('click', () => {
            this.uiController.showLoadModal();
        });
    }
}