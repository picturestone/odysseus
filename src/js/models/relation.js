export default class Relation {
    constructor(fromIsland, toIsland, speed, duration, direction) {
        this._fromIsland = fromIsland;
        this._toIsland = toIsland;
        // In knots
        this._speed = speed;
        // In hours
        this._duration = duration;
        // In degrees, 0 is north
        this._direction = direction;
    }

    getToIslandPosition() {
        // 1 h * 1kts = 1 sea mile, and 1 sea mile should be 100px.
        const distance = this._duration * this._speed * 100;
        const directionRad = this._direction * Math.PI / 180;
        const dx = Math.sin(directionRad) * distance;
        const dy = Math.cos(directionRad) * distance * -1;
        const x = this._fromIsland.x + dx;
        const y = this._fromIsland.y + dy;
        return {x, y};
    }

    // 
    getIslandArrowPosition(islandRadius) {
        // 1 h * 1kts = 1 sea mile, and 1 sea mile should be 100px.
        const distance = this._duration * this._speed * 100 - islandRadius;
        const directionRad = this._direction * Math.PI / 180;
        const dx = Math.sin(directionRad) * distance;
        const dy = Math.cos(directionRad) * distance * -1;
        const x = this._fromIsland.x + dx;
        const y = this._fromIsland.y + dy;
        return {x, y};
    }

    set toIsland(toIsland) {
        this._toIsland = toIsland;
    }

    get toIsland() {
        return this._toIsland;
    }

    set fromIsland(fromIsland) {
        this._fromIsland = fromIsland;
    }

    get fromIsland() {
        return this._fromIsland;
    }

    set speed(speed) {
        this._speed = speed;
    }

    get speed() {
        return this._speed;
    }

    set duration(duration) {
        this._duration = duration;
    }

    get duration() {
        return this._duration;
    }

    set direction(direction) {
        this._direction = direction;
    }

    get direction() {
        return this._direction;
    }
}