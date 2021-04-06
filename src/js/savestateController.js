export default class SavestateController {
    constructor(islandController) {
        this.islandController = islandController;
        this.$saveArea = $('.js-o-save-area');

        this.bindListeners();
    }

    bindListeners() {
        document.getElementById('saveModal').addEventListener('show.bs.modal', this.showSaveCode.bind(this))
    }

    showSaveCode() {
        const saveObject = {};
        saveObject.islands = [];
        this.islandController.parentIslands.forEach(parentIsland => {
            saveObject.islands.push(this.getIslandSavestate(parentIsland))
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
}