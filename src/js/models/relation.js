import { MILE_IN_PX } from '../constants';

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
        const distance = this.distance;
        const directionRad = this._direction * Math.PI / 180;
        const dx = Math.sin(directionRad) * distance;
        const dy = Math.cos(directionRad) * distance * -1;
        const x = this._fromIsland.x + dx;
        const y = this._fromIsland.y + dy;
        return {x, y};
    }

    // Calculates position for the tip of the arrow by subtracting the radius of the island according to the angle from the x and y coordinats.
    getIslandArrowPosition(islandRadius) {
        const distance = this.distance - islandRadius;
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

    get distance() {
        return this._duration * this._speed * MILE_IN_PX;
    }
}