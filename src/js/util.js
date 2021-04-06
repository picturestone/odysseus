function convertCoordinatesToMiles(coordinates) {
    return Math.round(coordinates) / 100
}

/**
 * 
 * @param {string} miles 
 * @returns float
 */
function convertMilesToCoordinates(miles) {
    return getFloatFromString(miles) * 100
}

function getFloatFromString(string, noOfDecimals = 2) {
    return parseFloat(
        string.replace(/,/g, ".")
    ).toFixed(noOfDecimals);
}

export {
    convertCoordinatesToMiles,
    convertMilesToCoordinates,
    getFloatFromString
}