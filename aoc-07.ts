import { read } from "./utils";


const mv = (n) => n == 0 ? 0 : n + mv(n-1)


const move = (a, b) => {
    return mv(Math.max(a, b) - Math.min(a, b));
}

const part1 = (data) => {
    let min = Infinity;

    data.map((it, cur) => {
        const arr = data.map((it) => Math.abs(it - cur))
        const a = arr.reduce((sum, it) => sum + it);

        if (a < min) {
            min = a
        }
    })
    return min;    
}

const part2 = (data) => {
    let min = Infinity;

    data.map((it, cur) => {
        const a = data
            .map((it) => move(it, cur))
            .reduce((sum, it) => sum + it)

        if (a < min) {
            min = a
        }
    })
    return min;
}

const parse = (raw) => {
  return raw.split(',').map(Number)
}

const day = 7;
const prod = true;

const parsedData = parse(read(day, prod))
console.time('part 1')
console.log(part1(parsedData));
console.timeEnd('part 1')
console.time('part 2')
console.log(part2(parsedData));
console.timeEnd('part 2')