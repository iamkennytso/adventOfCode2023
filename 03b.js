const fs = require('node:fs');

const processesGame = game => {
  const [_, data] = game.split(': ')
  const rounds = data.trim().split('; ')
  const obj = {
    red: 0,
    green: 0,
    blue: 0
  }
  rounds.forEach(round => {
    const cubes = round.split(', ')
    cubes.forEach(cube => {
      const [num, cubeColor] = cube.split(' ')
      obj[cubeColor] = Math.max(obj[cubeColor], num)
    })
  })
  return Object.values(obj).reduce((accu, cur) => cur === 0 ? accu : accu *= Number(cur), 1)
}

const nums = {
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
  0: true,
}

fs.readFile('./03.txt', 'utf8', (_, data) => {
  const rows = data.split('\n')
  const array = []
  rows.forEach(row => array.push(row.trim().split('')))
  const visited = {}
  let ans = 0

  const goLeft = (i, j, str = '') => {
    const coordStr = `${i},${j}`
    visited[coordStr] = true
    if (!array[i] || !array[i][j] || !nums[array[i][j]]) {
      return str
    }
    return goLeft(i, j-1, `${array[i][j]}${str}`)
  }
  
  const goRight = (i, j, str = '') => {
    const coordStr = `${i},${j}`
    visited[coordStr] = true
    if (!array[i] || !array[i][j] || !nums[array[i][j]]) {
      return str
    }
    return goRight(i, j+1, `${str}${array[i][j]}`)
  }

  const check = (i, j) => {
    const str = `${i},${j}`
    if (!array[i] || !array[i][j] || visited[str]) {
      return 0
    }
    visited[str] = true
    if (nums[array[i][j]]) {
      return Number(`${goLeft(i,j-1)}${array[i][j]}${goRight(i,j+1)}`)
    }
    return 0
  }

  const checkAround = (i, j) => {
    const arr = [
      check(i+1,j),
      check(i,j+1),
      check(i+1,j+1),
      check(i-1,j),
      check(i,j-1),
      check(i-1,j-1),
      check(i+1,j-1),
      check(i-1,j+1)
    ]
    const isNotZeroArray = arr.filter(ar => !!ar)
    if (isNotZeroArray.length === 2) {
      const prod = isNotZeroArray[0] * isNotZeroArray[1]
      ans += prod
    }
  }

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[0].length; j++) {
      const char = array[i][j]
      if (char === '*') {
        checkAround(i, j)
      }
    }
  }

  console.log(ans)
})