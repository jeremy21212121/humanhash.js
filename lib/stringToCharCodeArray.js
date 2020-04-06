/**
 * Turns a string into an array of character code values
 * @param  {String} inputString - String to be converted
 * @returns {Array[Number]} - Array of character code values
 */
const stringToCharCodeArray = inputString => inputString.split('').map(ch => ch.charCodeAt(0))

module.exports = stringToCharCodeArray

