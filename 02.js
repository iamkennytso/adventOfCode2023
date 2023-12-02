const fs = require('node:fs');

const cubesAvailable= {
  red: 12,
  green: 13,
  blue: 14
}
const processesGame = game => {
  const [_, data] = game.split(': ')
  const rounds = data.trim().split('; ')
  let flag = true
  rounds.forEach(round => {
    if (!flag) return flag
    const cubes = round.split(', ')
    cubes.forEach(cube => {
      if (!flag) return flag
      const [num, cubeColor] = cube.split(' ')
      if (cubesAvailable[cubeColor] < num) {
        flag = false
      }
    })
  })
  return flag
}

fs.readFile('./02.txt', 'utf8', (_, data) => {
  const games = data.split('\n')
  let sum = 0
  games.forEach((game, idx) => {
    if (processesGame(game.trim())) {
      sum += idx + 1
    }
  })
  console.log(sum)
})