const fs = require('node:fs');

fs.readFile('./05.txt', 'utf8', (_, data) => {
  const lines = data.split('\n')
  const [__, seedsList] = lines[0].trim().split(': ')
  const seeds = seedsList.split(' ')
  let seedToSoilIdx, soilToFertIdx, fertToWatIdx, watToLightIdx, lightToTempIdx, tempToHumIdx, humToLocIdx
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].includes('seed-to-soil map:')) {
      seedToSoilIdx = i
    }
    if (lines[i].includes('soil-to-fertilizer map:')) {
      soilToFertIdx = i
    }
    if (lines[i].includes('fertilizer-to-water map:')) {
      fertToWatIdx = i
    }
    if (lines[i].includes('water-to-light map:')) {
      watToLightIdx = i
    }
    if (lines[i].includes('light-to-temperature map:')) {
      lightToTempIdx = i
    }
    if (lines[i].includes('temperature-to-humidity map:')) {
      tempToHumIdx = i
    }
    if (lines[i].includes('humidity-to-location map:')) {
      humToLocIdx = i
    }
  }

  const seedToSoilMapArr = lines.slice(seedToSoilIdx + 1, soilToFertIdx - 1)
  const soilToFertMapArr = lines.slice(soilToFertIdx + 1, fertToWatIdx - 1)
  const fertToWatMapArr = lines.slice(fertToWatIdx + 1, watToLightIdx - 1)
  const watToLightMapArr = lines.slice(watToLightIdx + 1, lightToTempIdx - 1)
  const lightToTempMapArr = lines.slice(lightToTempIdx + 1, tempToHumIdx - 1)
  const tempToHumMapArr = lines.slice(tempToHumIdx + 1, humToLocIdx - 1)
  const humToLocMapArr = lines.slice(humToLocIdx + 1)
  const seqArrays = [seedToSoilMapArr, soilToFertMapArr, fertToWatMapArr, watToLightMapArr, lightToTempMapArr, tempToHumMapArr, humToLocMapArr]

  const traverse = seed => {
    let cur = Number(seed)
    seqArrays.forEach(arr => {
      let flag = false
      arr.forEach(seq => {
        const strings = seq.trim().split(' ')
        const [des, src, rng] = strings.map(Number)

        if (!flag && cur >= src && cur < src + rng) {
          const diff = des - src
          cur = cur + diff
          flag = true
        }
      })
    })
    return cur
  }

  let ans = Infinity
  const actualSeeds = []
  for (let i = 0; i < seeds.length; i += 2) {
    for (let j = 0; j < seeds[i+1]; j++) {
      actualSeeds.push(Number(seeds[i]) + Number(j))
    }
  }
  const memo = {}

  actualSeeds.forEach(seed => {
    if (!(seed in memo)) {
      const final = traverse(seed)
      memo[seed] = final
      ans = Math.min(ans, final)
    }
  })

  console.log(ans)
})
// this times out