/**
 * Makes random strings human-readable by lossily compressing them and mapping to English words.
 * 
 * It takes a high-entropy string like a hash or UUID, reduces the entropy through lossy compression and maps the resulting values to words.
 * 
 * These human-readable hashes are intended to be used for display purposes. Since they significantly reduce the entropy of the input, they should not be used as an index or for any other purpose that requires high entropy.
 * 
 * Ported from HumanHash.py (https://github.com/zacharyvoase/humanhash)
 *  
 */

const compress = require('./lib/compress.js')
const stringToCharCodeArray = require('./lib/stringToCharCodeArray.js')
const DEFAULT_WORDLIST = require('./lib/data/defaultWordList.js')

/**
 * 
 * Makes a high-entropy string more memorable for humans.
 *  @param  {String} inputString - High-entropy string, like a hash or UUID.
 *  @param  {Number} [outputLength=4] - Number of bytes of entropy (and words) to use for output.
 *  @param  {String} [separator=''] - Word separator eg. '-', ' ', '_'
 *  @param  {Array[String]} [wordArray=DEFAULT_WORDLIST] - Array of words used to generate output.
 *  @returns {String} - String of $outputLength words from $wordArray separated by $separator.
 */
const humanHash = (inputString, outputLength = 4, separator = ' ', wordArray = DEFAULT_WORDLIST ) => {
  const max = wordArray.length
  const charCodeArray = stringToCharCodeArray(inputString)
  const compressedArray = compress(charCodeArray, outputLength, max)
  const hasNaN = !compressedArray.every(n => !Number.isNaN(n))
  if (hasNaN) {
    throw new Error('HumanHash Compression NaN Error')
  }

  return compressedArray
      .map(n => wordArray[n])
      .reduce((a, b) => a + separator + b)
}

module.exports = { humanHash, compress, stringToCharCodeArray, DEFAULT_WORDLIST }
