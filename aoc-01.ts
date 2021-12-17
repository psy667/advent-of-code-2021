const part2 = data => {
  return data
    .filter(Boolean)
    .map(Number)
    .reduce((acc,cur, idx, arr) => [...acc, arr[idx] + (arr[idx - 1] || 0) + (arr[idx - 2] || 0)], [])
    .slice(2)
    .reduce((acc,cur) => {
        if(cur > acc.prev) {
            return {prev: cur, count: acc.count + 1}
        } else {
            return {prev: cur, count: acc.count}
        }
    }, {prev: Infinity, count: 0}).count
}

const parse = raw => raw.split('\n'); 

import { read } from "./utils";

const day = 1;
const prod = true;

console.time('1')
console.log(part2(parse(read(day, prod))));
console.timeEnd('1')