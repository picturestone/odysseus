import { MILE_IN_PX } from './constants';

function convertCoordinatesToMiles(coordinates) {
    return Math.round(coordinates) / MILE_IN_PX;
}

/**
 * 
 * @param {string} miles 
 * @returns float
 */
function convertMilesToCoordinates(miles) {
    return getFloatFromString(miles) * MILE_IN_PX;
}

function getFloatFromString(string, noOfDecimals = 2) {
    return parseFloat(
        string.replace(/,/g, ".")
    ).toFixed(noOfDecimals);
}

export {
    convertCoordinatesToMiles,
    convertMilesToCoordinates,
    getFloatFromString,
}