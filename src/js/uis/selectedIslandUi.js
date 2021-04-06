import { convertCoordinatesToMiles, convertMilesToCoordinates, getFloatFromString } from '../util';

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
            <h4 class="pe-5">${this.island.name}</h4>
        `));

        // Add current state of island
        const xString = `${convertCoordinatesToMiles(this.island.x)} SM`;
        $container.append(this.getStaticProperty('x', xString));
        const yString = `${convertCoordinatesToMiles(this.island.y)} SM`;
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

        // Parent island form to edit position of island
        if (this.island.parentRelation) {
            // Add some headlines
            $container.append($(`<hr />`));
            $container.append($(`<h4>Erreichbar von <b>${this.island.parentRelation.fromIsland.name}</b> aus durch: </h4>`));

            // Add a container for the form
            const $formContainer = $(`<form class="d-flex flex-column align-items-stretch"></form>`);
            $container.append($formContainer);

            // Add form fields
            $formContainer.append(this.getDynamicProperty('Name', 'name', this.island.name, 'text'));
            $formContainer.append(this.getDynamicProperty('Notiz', 'note', this.island.note, 'textarea'));
            $formContainer.append(this.getDynamicProperty('Speed [ktn]', 'speed', this.island.parentRelation.speed, 'number', 1));
            $formContainer.append(this.getDynamicProperty('Dauer [Stunden]', 'duration', this.island.parentRelation.duration, 'number', 1));
            $formContainer.append(this.getDynamicProperty('Richtung [Grad]', 'direction', this.island.parentRelation.direction, 'number', 0));

            // Add info about distance
            $formContainer.append(this.getStaticProperty('Resultierende Distanz:', `${convertCoordinatesToMiles(this.island.parentRelation.distance)} SM`));

            // Add submit button
            $formContainer.append($(`
                <button type="submit" class="btn btn-success">Speichern</button>
            `));

            // Trigger recalculations of island and all children on submission, as well as UI.
            $formContainer.on('submit', (event) => {
                event.preventDefault();
                const data = $formContainer.serializeArray().reduce((obj, item) => {
                    obj[item.name] = item.value;
                    return obj;
                }, {});
                this.island.name = data.name;
                this.island.note = data.note;
                this.island.parentRelation.speed = getFloatFromString(data.speed, 1);
                this.island.parentRelation.duration = getFloatFromString(data.duration, 1);
                this.island.parentRelation.direction = getFloatFromString(data.direction, 0);
                this.islandController.recalculatePositions(this.island);
                this.uiController.showSelectedIsland(this.island);
            });
        } else {
            // Add some headlines
            $container.append($(`<hr />`));
            $container.append($(`<p>Diese Insel hängt von keiner anderen ab.</p>`));

            // Add a container for the form
            const $formContainer = $(`<form class="d-flex flex-column align-items-stretch"></form>`);
            $container.append($formContainer);

            // Add form fields
            $formContainer.append(this.getDynamicProperty('Name', 'name', this.island.name, 'text'));
            $formContainer.append(this.getDynamicProperty('Notiz', 'note', this.island.note, 'textarea'));
            $formContainer.append(this.getDynamicProperty('x', 'x', convertCoordinatesToMiles(this.island.x)));
            $formContainer.append(this.getDynamicProperty('y', 'y', convertCoordinatesToMiles(this.island.y)));

            // Add submit button
            $formContainer.append($(`
                <button type="submit" class="btn btn-success">Speichern</button>
            `));

            // Trigger recalculations of island and all children on submission, as well as UI.
            $formContainer.on('submit', (event) => {
                event.preventDefault();
                const data = $formContainer.serializeArray().reduce((obj, item) => {
                    obj[item.name] = item.value;
                    return obj;
                }, {});
                this.island.name = data.name;
                this.island.note = data.note;
                console.log(data);
                this.island.x = convertMilesToCoordinates(data.x);
                this.island.y = convertMilesToCoordinates(data.y);
                this.islandController.recalculatePositions(this.island);
                this.uiController.showSelectedIsland(this.island);
            });
        }
    }

    getStaticProperty(name, value) {
        return $(`
            <div class="d-flex justify-content-between">
                <p>${name}</p>
                <p>${value}</p>
            </div>
        `);
    }

    getDynamicProperty(label, name, value, type = 'number', precision = 2) {
        const container = $(`<div class="d-flex justify-content-between align-items-center mb-3"></div>`);
        container.append($(`<label for="${name}" class="form-label">${label}</label>`));

        if(type === 'number') {
            const inputPrecision = 1 / Math.pow(10, precision); 
            container.append($(`
                <input name="${name}" class="form-control w-50" type="${type}" value="${value}" min="0" step="${inputPrecision}">
            `));
        } else if(type === 'textarea') {
            container.append($(`
                <textarea name="${name}" class="form-control w-50" rows="3">${value}</textarea>
            `));
        } else {
            container.append($(`<input name="${name}" class="form-control w-50" type="${type}" value="${value}">`));
        }

        return container;
    }
}