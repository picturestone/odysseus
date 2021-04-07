import * as bootstrap from 'bootstrap';
import Island from './models/island';
import Relation from './models/relation';

export default class SavestateController {
    constructor(islandController) {
        this.islandController = islandController;
        this.$saveArea = $('.js-o-save-area');
        this.$loadArea = $('.js-o-load-area');
        this.$loadButton = $('.js-o-load-button');
        this.$loadModalCloseButtons = $('.js-o-load-modal-close');

        this.bindListeners();
    }

    bindListeners() {
        document.getElementById('saveModal').addEventListener('show.bs.modal', this.showSaveCode.bind(this));
        this.$loadButton.on('click', this.loadSaveCode.bind(this));
        this.$loadModalCloseButtons.on('click', this.hideLoadModal.bind(this));
    }

    showSaveCode() {
        const saveObject = {};
        saveObject.islands = [];
        this.islandController.parentIslands.forEach(parentIsland => {
            saveObject.islands.push(this.getIslandSavestate(parentIsland));
        });
        
        this.$saveArea.text(JSON.stringify(saveObject));
    }

    getIslandSavestate(island) {
        const islandSave = {};

        islandSave.name = island.name;
        islandSave.note = island.note;
        if (!island.parentRelation) {
            islandSave.x = island.x;
            islandSave.y = island.y;
        }
        islandSave.childrenRelations = []

        island.childrenRelations.forEach(relation => {
            islandSave.childrenRelations.push(this.getChildrenRelationSavestate(relation))
        });

        return islandSave;
    }

    getChildrenRelationSavestate(relation) {
        const relationSave = {};

        relationSave.speed = relation.speed;
        relationSave.duration = relation.duration;
        relationSave.direction = relation.direction;
        relationSave.toIsland = this.getIslandSavestate(relation.toIsland);

        return relationSave;
    }

    loadSaveCode() {
        // Remove all islands
        this.islandController.parentIslands.length = 0;
        const saveState = JSON.parse(this.$loadArea.val());
        
        saveState.islands.forEach(parentIsland => {
            this.islandController.parentIslands.push(this.getIsland(parentIsland));
        });

        // Trigger re-render
        this.islandController.renderAllIslands();
        this.$loadArea.val('');
        this.hideLoadModal();
    }

    showLoadModal() {
        this.loadModal = new bootstrap.Modal(document.getElementById('loadModal'));
        this.loadModal.show();
    }

    hideLoadModal() {
        if (this.loadModal !== undefined) {
            this.loadModal.hide();
        }
    }

    getIsland(islandSaveState) {
        const island = new Island(this.islandController);

        island.name = islandSaveState.name;
        island.note = islandSaveState.note;
        if (!islandSaveState.parentRelation) {
            island.x = islandSaveState.x;
            island.y = islandSaveState.y;
        }

        islandSaveState.childrenRelations.forEach(relationSaveState => {
            island.childrenRelations.push(this.getChildrenRelation(relationSaveState, island))
        });

        return island;
    }

    getChildrenRelation(relationSaveState, parentIsland) {
        const child = this.getIsland(relationSaveState.toIsland);
        const relation = new Relation(
            parentIsland,
            child,
            relationSaveState.speed, 
            relationSaveState.duration, 
            relationSaveState.direction
        );
        child.parentRelation = relation;

        return relation;
    }
}