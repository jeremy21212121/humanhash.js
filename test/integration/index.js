const assert = require('assert').strict
const crypto = require('crypto')
const { humanHash } = require('../../index.js')
/**
* @returns {String} - SHA256 hash digest
*/
const hash = (data) => crypto.createHash('sha256').update(data).digest('hex')

/**
*  Counts the occurences of a string in an array
* @returns {Number} - Number of occurences of $searchString
*/
const count = (array, searchString) => array.filter((str) => str === searchString).length

/**
*  Returns true if there is exactly one occurence of $searchString in $array
* @returns {Boolean}
*/
const isUnique = (array, searchString) => count(array, searchString) === 1

module.exports = () => {
  
  describe('humanHash', () => {

    describe('Generate an array of 1000 human hashes deterministically', () => {

      // creates any array of number strings from "0" to "999"
      const stringArray = Array.from(Array(1000)).map((v, i) => i.toString())
      
      // hashes each number string with sha256
      const hashArray = stringArray.map((string) => hash(string))
      
      // will store an array of humanHashes
      let humanHashArray

      it('should not throw an error while generating humanhashes', () => {
        // maps each hash digest into a humanhash
        humanHashArray = hashArray.map((hashString) => humanHash(hashString))
      })

      it('should each consist of 4 words seperated by spaces', () => {
        // an array containing word arrays: Array[Array[String]]
        const hhWordArrayArray = humanHashArray.map((hh) => hh.split(' '))
        // every array item should be an array of 4 words
        const result = hhWordArrayArray.every((hhWordArray) => hhWordArray.length === 4)
        
        assert.equal(result, true)
      })

      it('should each be unique', () => {
        assert.equal(humanHashArray.every((hh, i, arr) => isUnique(arr, hh)), true)
      })
   
    })

  })

}
