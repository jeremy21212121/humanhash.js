const assert = require('assert').strict
const { stringToCharCodeArray } = require('../../index.js')

module.exports = () => {
  
  describe('stringToCharCodeArray', () => {
  
    it('should generate correct output', () => {
      
      const testStrings = [ 'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' ]
      
      // the correct results for the above test strings, verified through other means
      const correctResults = testStrings.map((str, index) => Array.from(Array(str.length)).map((el, i) => i + 97 - index * 32))

      // an array of char code arrays output by stringToCharCodeArray(testString)
      const testResults = testStrings.map((str) => stringToCharCodeArray(str))

      // stringify testResults[index], correctResults[index] and check equality
      testResults.forEach((numberArray, index) =>
        assert.equal(JSON.stringify(numberArray), JSON.stringify(correctResults[index]))
      )

    })

  })

}
