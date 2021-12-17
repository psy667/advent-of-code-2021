import { read } from "./utils"

const part1 = (data) => {

}

const part2 = (data) => {

}

const parse = (raw) => {
    return raw
        .split('\n')
}

const day = 10
const prod = 0

const parsedData = parse(read(day, prod))
console.time('part 1')
console.log(part1(parsedData));
console.timeEnd('part 1')
console.time('part 2')
console.log(part2(parsedData));
console.timeEnd('part 2')