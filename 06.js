const fs = require('node:fs');

fs.readFile('./06.txt', 'utf8', (_, data) => {
  const [timesStr, distStr] = data.split('\n')

  const [__, timesWithSpaces] = timesStr.trim().split('Time:      ')
  const [___, disWithSpaces] = distStr.trim().split('Distance:  ')
  const times = timesWithSpaces.split(' ').filter(str => !!str)
  const dists = disWithSpaces.split(' ').filter(str => !!str)
  const maxTime = Math.max(...times)
  console.log(maxTime)
  const maxSpeedsArray = []
  for (let i = 0; i < maxTime; i++) {
    maxSpeedsArray.push(i * maxTime)
  }
  const speedArrays = []
  times.forEach(raceTime => {
    const subArray = []
    for (let i = 0; i < raceTime; i++) {
      
    }
  })
  console.log(maxSpeedsArray)
})