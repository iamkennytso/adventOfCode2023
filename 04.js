const fs = require('node:fs');

fs.readFile('./04.txt', 'utf8', (_, data) => {
  const rows = data.split('\n')
  let ans = 0
  rows.forEach(row => {
    const [_, nums] = row.trim().split(':')
    const [winningClump, ownClump] = nums.split(' | ')
    winningNums = winningClump.split(' ').filter(num => !!num)
    ownNums = ownClump.split(' ').filter(num => !!num)
    let hits = 0
    const obj = {}
    winningNums.forEach(winningNum => obj[winningNum] = true)
    ownNums.forEach(ownNum => {
      if (obj[ownNum]) hits ? hits *= 2 : hits = 1
    })
    ans += hits
  })
  console.log(ans)
})