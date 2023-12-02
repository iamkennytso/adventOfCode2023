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

fs.readFile('./02.txt', 'utf8', (_, data) => {
  const games = data.split('\n')
  let prod = 0
  games.forEach(game => {
    prod += processesGame(game)
  })
  console.log(prod)
})