import { readFileSync } from 'fs';

export const read = (number: number, prod: boolean | 0 | 1) => {
  const dir = prod ? 'data' : 'data-test'
  const path = `${dir}/${number.toString().padStart(2, '0')}.txt`

  return readFileSync(path, 'utf8')
}

export const sum = (acc: number, cur: number) => acc + cur;
export const mul = (acc: number, cur: number) => acc * cur;
export const min = (acc: number, cur: number) => cur < acc ? cur : acc;
export const max = (acc: number, cur: number) => cur > acc ? cur : acc;


export const forXY = (len1, len2, cb: (x, y) => any) => {
  for (let x = 0; x < len1; x++) {
    for (let y = 0; y < len2; y++) {
      cb(x,y)
    }
  }
}

export const it = {
  split: (n: string) => (it: string) => it.split(n),
  toString: () => (it: number) => it.toString(),
  toInt: () => (it: string) => parseInt(it),
  toFloat: () => (it: string) => parseFloat(it),
  toLowerCase: () => (it: string) => it.toLowerCase(),
  toUpperCase: () => (it: string) => it.toUpperCase(),
}

export interface AoC<T> {
  day: number
  prod: boolean

  part1: (data: T) => string | number;
  part2: (data: T) => string | number;
}

