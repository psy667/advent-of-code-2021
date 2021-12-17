import { read, sum } from "./utils"

const code = {
    '(': [3, 1],
    ')': [3, -1],
    '[': [57, 1],
    ']': [57, -1],
    '{': [1197, 1],
    '}': [1197, -1],
    '<': [25137, 1],
    '>': [25137, -1]
}
const mapping = {};

const mapping2 = {
    '3': 1,
    '57': 2,
    '1197': 3,
    '25137': 4
}

Object.entries(code).forEach(([sym, it]) => {
    const [k, v] = it;
    mapping[`${k * v}`] = sym;
})

const part1 = (data) => {
    return data.map(line => {
        let stack = [];
        
        for (let sym of line) {
            const [k, v] = code[sym];
            const lastOpened = stack[stack.length - 1]

            if (v === -1) {
                if (lastOpened !== k) {
                    return k;
                }
                stack.pop()
            }

            if (v === 1) {
                stack.push(k)
            }
        }
        return false
    }).filter(Boolean).reduce(sum, 0)
}

const part2 = (data) => {
    const result = data.map(line => {
        let stack = [];
        
        for (let sym of line) {
            const [k, v] = code[sym];
            const lastOpened = stack[stack.length - 1]
            if (v === -1) {
                if (lastOpened !== k) {
                    return false;
                }
                stack.pop()
            }


            if (v === 1) {
                stack.push(k)
            }
        }

        return stack.reverse().map(it => mapping2[it])
    }).filter(Boolean).map(line => line.reduce((acc, cur) => acc * 5 + cur, 0));

    result.sort((a, b) => a - b)
    
    return result[Math.floor(result.length / 2)]
}

const parse = (raw) => {
  return raw
        .split('\n')
        .map(it => it.split(''))
}

const day = 10;
const prod = true;

const parsedData = parse(read(day, prod))
console.time('part 1')
console.log(part1(parsedData));
console.timeEnd('part 1')
console.time('part 2')
console.log(part2(parsedData));
console.timeEnd('part 2')