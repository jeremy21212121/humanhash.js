const assert = require('assert').strict
const { DEFAULT_WORDLIST } = require('../../index.js')

module.exports = () => {

  describe('DEFAULT_WORDLIST', () => {

    it('contains 256 items', () => {
      assert.equal(DEFAULT_WORDLIST.length, 256)
    })

    it('contains only non-empty strings', () => {
      assert(DEFAULT_WORDLIST.every((str) => (typeof str === 'string' && str.length > 0)))
    })

    it('contains only single words made up of characters from the basic latin alphabet', () => {
      const re = /^[A-Za-z]+$/
      DEFAULT_WORDLIST.forEach((str) => assert(re.test(str), str))
    })

  })

}
