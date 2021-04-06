export default class DefaultUi {
    constructor(uiController) {
        this.$el = uiController.$el;
        this.islandController = uiController.islandController;
    }

    show() {
        this.$el.empty();

        const $newIslandButton = $(`
            <button type="button" class="btn btn-primary">
                Neue unabhängige Insel
            </button>
        `);

        this.$el.append($newIslandButton);
        $newIslandButton.on('click', () => {
            this.islandController.addIsland(50, 50);
        });
    }
}