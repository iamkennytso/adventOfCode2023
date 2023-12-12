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

  const createMap = mapArray => {
    const obj = {}
    mapArray.forEach(map => {
      const [des, src, rng] = map.trim().split(' ')
      for (let i = 0; i < rng; i++) {
        obj[Number(src) + i] = Number(des) + i
      }
    })
    return obj
  }

  const seedToSoilMapArr = lines.slice(seedToSoilIdx + 1, soilToFertIdx - 1)
  const soilToFertMapArr = lines.slice(soilToFertIdx + 1, fertToWatIdx - 1)
  const fertToWatMapArr = lines.slice(fertToWatIdx + 1, watToLightIdx - 1)
  const watToLightMapArr = lines.slice(watToLightIdx + 1, lightToTempIdx - 1)
  const lightToTempMapArr = lines.slice(lightToTempIdx + 1, tempToHumIdx - 1)
  const tempToHumMapArr = lines.slice(tempToHumIdx + 1, humToLocIdx - 1)
  const humToLocMapArr = lines.slice(humToLocIdx + 1)

  const seedToSoilMap = createMap(seedToSoilMapArr)
  const soilToFertMap = createMap(soilToFertMapArr)
  const fertToWatMap = createMap(fertToWatMapArr)
  const watToLightMap = createMap(watToLightMapArr)
  const lightToTempMap = createMap(lightToTempMapArr)
  const tempToHumMap = createMap(tempToHumMapArr)
  const humToLocMap = createMap(humToLocMapArr)
  
  const seqArr = [seedToSoilMap, soilToFertMap, fertToWatMap, watToLightMap, lightToTempMap, tempToHumMap, humToLocMap]

  let ans = Infinity

  seeds.forEach(seed => {
    let cur = seed
    seqArr.forEach(seq => {
      seq[cur] ? cur = seq[cur] : cur
    })
    ans = Math.min(ans, cur)
  })
  console.log(ans)
})