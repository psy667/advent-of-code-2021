import { read } from "./utils";

const sum = (arr1, arr2) => {
  return arr1.map((it,idx) => it + arr2[idx])
}

const calcMode = (data) => {
  const len = data.length;
  const mid = len / 2;
  const d = data.reduce((acc,cur) => sum(acc, cur)) 
  return d.map(it => Number(it >= mid));
}

const calcAntiMode = (data) => {
  const len = data.length;
  const mid = len / 2;
  const d = data.reduce((acc,cur) => sum(acc, cur))
  return d.map(it => Number(it < mid));
}

const part1 = (data) => {
  const gamma = calcMode(data) 
  const eps = gamma.map(it => Number(!it)); 
  const gammaStr = gamma.join('') 
  const epsStr = eps.join('')  

  return parseInt(gammaStr, 2) * parseInt(epsStr, 2) // ?
}

const part2 = (data) => {
  const gamma = calcMode(data) 
  const eps = gamma.map(it => Number(!it)); 
  const gammaStr = gamma.join('') 
  const epsStr = eps.join('')  



  const iter = (arr, n = 1) => {
      const Mode = calcMode(arr.map(it => it.split('').map(Number))).join('').slice(0,n) 
      const a = arr.filter(it => it.startsWith(Mode));
      if(a.length > 1) {
          return iter(a, n + 1)
      }
      return a[0]
  }

  const iter2 = (arr, n = 1, mod = '') => {
      const Mode = mod + calcAntiMode(arr
          .map(it => it
              .split('')
              .map(Number)
          )
      )
      .join('') 
      .slice(n-1,n) 

      const a = arr.filter(it => it.startsWith(Mode)); 
      if(a.length > 1) {
          return iter2(a, n + 1, Mode)
      }
      return a[0]
  }

  const oxy = iter(data.map(it => it.join(''))); 
  const co2 = iter2(data.map(it => it.join(''))); 
  const answer2 = parseInt(oxy, 2) * parseInt(co2, 2);
  return answer2
}

const parse = raw => {
  return raw.split('\n').map(it => {
    const arr = it.split('').map(Number)
    return arr
  })
}

const day = 3;
const prod = true;

const parsedData = parse(read(day, prod))
console.time('part 1')
console.log(part1(parsedData));
console.timeEnd('part 1')
console.time('part 2')
console.log(part2(parsedData));
console.timeEnd('part 2')