import { read } from "./utils";

const map = {
    0: [5, 0, 2, 7],
    1: [6, 1, 3, 8],
    2: [0, 2, 4],
    3: [1, 3, 5],
    4: [2, 4, 6],
    5: [3, 5, 7],
    6: [4, 6, 8],
    7: [5, 0],
    8: [6, 1],
}

const part1 = (data) => {
    let arr = data;
    let newFish = [];
    
    for (let i = 0; i < 32; i++) {
        newFish = [];
        arr = arr.map(it => {
            if (it === 0) {
                newFish.push(8)
                return 6;
            } else {
                return it - 1;
            }
        }).concat(newFish);
    }

    arr.length //?

    return arr.length;
}

const part2 = (data) => {
    let counter: Record<number, number> = {}

    data.map((k) => {
        counter[k] = (counter[k] || 0) + 1;
    })
    
    for (let i = 0; i < 5; i++) {
        Object.entries(counter).map((n) => {
            const [key, val] = n;
            map[key].forEach(k => {
                counter[k] = (counter[k] || 0) + val;
            })
        })
    }

    return Object.entries(counter).reduce((acc,cur) => {
        return acc + cur[1]
    }, 0);
}

const parse = (raw) => {
  return raw.split(',').map(it => Number(it))
}

const day = 6;
const prod = true;

const parsedData = parse(read(day, prod))
console.time('part 1')
console.log(part1(parsedData));
console.timeEnd('part 1')
console.time('part 2')
console.log(part2(parsedData));
console.timeEnd('part 2')

