const assert = require('assert').strict
const { compress } = require('../../index.js')

/**
*  Returns a random integer between 4 and $max + 4. Not cryptographically sound.
* @param {Number} max - Integer representing maximum value
* @returns {Number} - Random integer between 1 and $max
*/
const getRandInt = (max) => Math.floor(Math.random() * (max + 1)) + 4

/**
*  Creates an array of random length under `$max + 4` consisting of random integers under `$max + 4`.
* @param {Number} max - Integer representing maximum value
* @returns {Array[Number]} - Random integer array
*/
const randomNumberArray = (max) => Array.from(Array(getRandInt(max))).map((val) => getRandInt(max))

module.exports = () => {
  // number of test compression outputs to generate and approximate max integer value
  const testMax = 1000

  describe('compress', () => {
    /*
    // While non-deterministic, the following test should not be able to generate any input that `compress` can't handle.
    // In the event of a failure, the failing input will be logged to the console to aid in debugging.
    */
    describe(`Non-deterministic test of ${testMax} compressions of random number arrays`, () => {
      // Generates an array of $testMax length consisting of `randomNumberArray(testMax)` return values
      // Array[Array[Number]]
      const testArrayArray = Array.from(Array(testMax)).map(() => randomNumberArray(testMax))
      let compressedOutputArray
      
      it('should not throw an error while compressing 1000 test arrays of random integers', () => {
        try {
          // an array of compressed `testArray`'s
          compressedOutputArray = testArrayArray.map((testArray) => compress(testArray))
        }
        catch (e) {
          assert(false, e.message)
        }
      })
      it('all outputs should have the default length of 4', () => {
        assert(compressedOutputArray.every((compressedArray) => compressedArray.length === 4))
      })
      it('no output arrays should contain NaN', () => {
        assert(compressedOutputArray.every((compressedArray) =>
          compressedArray.every((val) =>
            !isNaN(val)
          )
        ))
      })
      it('all output array values should be less than the default max of 256', () => {
        //~ assert(compressedOutputArray.every((compressedArray) => compressedArray.every((val) => val < 256 )))
        compressedOutputArray.forEach( (compressedArray) =>
          compressedArray.forEach( (val, i) =>
            assert(val < 256, `actual value ${i}: ${val}`)
          )
        )
      })
    })

  })
}
