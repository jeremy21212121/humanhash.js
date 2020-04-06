/**
 * Takes an array of integers and lossily compresses it to $n values between 0 and $max
 * @param  {Array[Number]} arr - Array of integers to compress
 * @param  {Number} [n=4] - Length of output array
 * @param  {Number} [max=256] - Maximum value
 * @returns {Array[Number]} - Compressed array of integer values between 0 and max
 */
const compress = (arr, n = 4, max = 256) => {

  if (arr.length < n) {
    // input array is too short, return array of NaN
    return Array.from(Array(n)).map(ud => NaN)
  }
  let outputArray = [...arr]
  let mod = arr.length % n
  while (mod > 0) {
    // pop array until it is evenly divisible by n.
    // We could mix them in instead of throwing them away.
    outputArray.pop()
    mod -= 1
  }
  // compression ratio. This many byte values will be reduced to 1 byte value.
  const ratio = outputArray.length / n
  if (ratio > 1) {
   // compression is required
    const compressionArray = []
    for (let i=0; i<n; i++) {
      compressionArray.push(outputArray.slice(i*ratio, (i+1)*ratio))
    }
    outputArray = compressionArray.map(intArr => intArr.reduce((a, b) => a + b))
  } 
  outputArray = outputArray.map((n) => n % max)
  
  return outputArray

}

module.exports = compress
