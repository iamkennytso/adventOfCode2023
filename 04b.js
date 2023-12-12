const fs = require('node:fs');

fs.readFile('./04.txt', 'utf8', (_, data) => {
  const rows = data.split('\n')
  const cardsArr = []
  rows.forEach((row, rowIdx) => {
    cardsArr[rowIdx] ? cardsArr[rowIdx]++ : cardsArr[rowIdx] = 1
    const [_, nums] = row.trim().split(':')
    const [winningClump, ownClump] = nums.split(' | ')
    winningNums = winningClump.split(' ').filter(num => !!num)
    ownNums = ownClump.split(' ').filter(num => !!num)
    let hits = 0
    const obj = {}
    winningNums.forEach(winningNum => obj[winningNum] = true)
    ownNums.forEach(ownNum => {
      if (obj[ownNum]) hits++
    })
    for (let i = 0; i < hits; i++) {
      cardsArr[rowIdx + i + 1] 
        ? cardsArr[rowIdx + i + 1] += cardsArr[rowIdx]
        : cardsArr[rowIdx + i + 1] = 1
    }
  })
  console.log(cardsArr)
  console.log(cardsArr.reduce((sum, num) => sum += num, 0))
})