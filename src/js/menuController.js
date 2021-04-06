export default class MenuController {
    constructor(islandController) {
        this.$el = $('.js-o-ui');
        this.islandController = islandController;
    }

    showDefault() {
        this.$el.empty();

        const $newIslandButton = $(`
            <button type="button" class="btn btn-primary">
                Neue Insel hinzufügen
            </button>
        `);

        this.$el.append($newIslandButton);
        $newIslandButton.on('click', () => {
            this.islandController.addIsland(50, 50);
        });
    }
}