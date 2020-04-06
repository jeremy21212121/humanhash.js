Inspired by the python library [humanhash](https://github.com/zacharyvoase/humanhash).

## Purpose

Makes random strings like UUID's and hash digests human-readable. 

## How it works

It converts a string to an array of character codes, then compresses that array to the default length (4) and maps the resulting values to English words.

By default the words are separated by spaces, but any other separation character can be specified as an optional parameter.

## What not to do

Don't store the humanhash output. It severely reduces the entropy on the hash, making collisions much more likely.

For that reason, humanhashes shouldn't be used as an index or for any other purpose that requires high entropy.

## API

This library has a simpler API than [it's namesake](https://github.com/zacharyvoase/humanhash). It exposes one function, `humanHash`, which has only one mandatory parameter.

The following is the function signature in JSDoc format:

```JS
/**
 * Makes a high-entropy string more readable and memorable for humans.
 *  @param  {String} inputString - High-entropy string, like a hash digest or UUID.
 *  @param  {Number} [outputLength=4] - Number of bytes of entropy (and words) to use for output.
 *  @param  {String} [separator=''] - Word separator eg. '-', ' ', '_'
 *  @param  {Array[String]} [wordArray=DEFAULT_WORDLIST] - Array of words used to generate output.
 *  @returns {String} - String of $outputLength words from $wordArray separated by $separator.
 */
```

## Installation

```JS
npm install humanhash.js
```

## Examples

### Browser

```JS
import { humanHash } from 'humanhash.js'

const hh = humanHash('7528880a986c40e78c38115e640da2a1')

console.log(hh)

// > 'sweet artist alanine cat'
```

### Node

```JS
const { humanHash } = require('humanhash.js')

const hh = humanHash('7528880a986c40e78c38115e640da2a1')

console.log(hh)

// > 'sweet artist alanine cat'
```

### Advanced usage

Alter the default parameters to suit your use-case

#### Supply your own word list

```JS
// ...

const customWordListArray = [ 'bring', 'your', 'own', 'words' ]

const customHumanHash = (inputString) => humanHash(inputString, 4, ' ', customWordListArray)

const hh = customHumanHash('7528880a986c40e78c38115e640da2a1')

```

### Use dashes instead of spaces as the word separator

```JS
// ...

const customHumanHash = (inputString) => humanHash(inputString, 4, '-')

const hh = customHumanHash('7528880a986c40e78c38115e640da2a1')

console.log(hh)

// > 'sweet-artist-alanine-cat'

```

#### Increase output word length

```JS
// ...

const customOutputLength = 6

const customHumanHash = (inputString) => humanHash(inputString, customOutputLength)

const hh = customHumanHash('7528880a986c40e78c38115e640da2a1')

console.log(hh)

// > 'autumn edward illinois eleven delta hawaii'

```

