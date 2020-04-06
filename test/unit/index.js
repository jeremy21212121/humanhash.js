const assert = require('assert').strict
const { compress, stringToCharCodeArray, DEFAULT_WORDLIST } = require('../../index.js')

module.exports = () => {
  require('./compress.js')()
  require('./stringToCharCodeArray.js')()
  require('./defaultWordlist.js')()
}
