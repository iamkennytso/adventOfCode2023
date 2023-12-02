const fs = require('node:fs');
const getNum = line => {
  let left = 0
  let right = line.length - 1
  let leftValid = false
  let rightValid = false

  const obj = {
    'one': 'o1e',
    'two': 't2o',
    'three': 't3e',
    'four': 'f4r',
    'five': 'f5e',
    'six': 's6x',
    'seven': 's7n',
    'eight': 'e8t',
    'nine': 'n9e'
  }

  for (let key in obj) {
    line = line.replaceAll(key, obj[key])
  }

  while (left < right && (!leftValid || !rightValid)) {
    if (isNaN(Number(line[left])) && !leftValid) {
      left++
    } else {
      leftValid = true
    }
    if (isNaN(Number(line[right])) && !rightValid) {
      right--
    } else {
      rightValid = true
    }
  }
  return Number(`${line[left]}${line[right]}`)
}

fs.readFile('./01.txt', 'utf8', (_, data) => {
  const lines = data.split('\n')
  let sum = 0
  lines.forEach(line => {
    sum += getNum(line.trim())
  })
  console.log(sum)
})