import { read } from "./utils"

const part1 = (data) => (
    data
        .map(line => line
            .split('|')[1]
            .trim()
            .split(' ')
            .filter(it => [2, 3, 7, 4]
                .includes(it.length))
            .length
    ).reduce((acc, cur) => acc + cur, 0)
)

const minus = (arr1, arr2) => arr1.filter(i => !arr2.includes(i))
const has = (arr1, arr2) => arr2.every(i => arr1.includes(i))
const eq = (arr1, arr2) => [arr1, arr2]
    .map(it => it
        .slice(0)
        .sort()
        .join('')
    ).reduce((s1, s2) => s1 === s2)

const sortStr = (str) => str.split('').sort().join('')

const part2 = (data) => (
    data.map(line => {
        const digits = line.split('|')[1].trim().split(' ')

        const encoded = line.split('|')[0].trim().split(' ')
    
        const _1 = encoded.find((v) => v.length === 2).split('')
        const _7 = encoded.find((v) => v.length === 3).split('')
        const _8 = encoded.find((v) => v.length === 7).split('')
        const _4 = encoded.find((v) => v.length === 4).split('')

        const _235 = encoded.filter(it => it.length === 5).map(it => it.split(''))
        const _069 = encoded.filter(it => it.length === 6).map(it => it.split(''))
        const fPossible = minus(_4, _1)

        const fCount = fPossible.map(t => (
            _235.reduce((acc, cur) => acc + cur.includes(t), 0)
        ))

        const f = fCount[0] === 3 ? fPossible[0] : fPossible[1]
        const e = fPossible.find(it => it !== f)
        const _5 = _235.find(it => it.includes(e))
        const _3 = _235.find(it => has(it, _1))
        const _2 = _235.find(it => !eq(_5, it) && !eq(_3, it))
        const _9 = _069.find(it => has(it, _4))
        const _6 = _069.find(it => !has(it, _1))
        const _0 = _069.find(it => !eq(it, _9) && !eq(it, _6))

        const mapping = [_0, _1, _2, _3, _4, _5, _6, _7, _8, _9]
            .map(it => sortStr(it.join('')))

        return digits
            .map(it => mapping.indexOf(sortStr(it)))
            .join('')
    }).reduce((acc,cur) => acc + Number(cur), 0)
)



const parse = (raw) => {
  return raw
      .split('\n')
}

const day = 8;
const prod = true;

const parsedData = parse(read(day, prod))
console.time('part 1')
console.log(part1(parsedData));
console.timeEnd('part 1')
console.time('part 2')
console.log(part2(parsedData));
console.timeEnd('part 2')