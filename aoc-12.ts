import { read, it } from "./utils"

const isBigCave = (n) => n.toUpperCase() === n;

const part1 = (data) => {
    const cave = {};

    data.forEach(it => {
        const [from, to] = it;
        
        if (from !== 'end') {
            if (cave[from]) {
                cave[from].push(to)
            } else {
                cave[from] = [to]
            }
        }
        

        if (to !== 'end') {
            if (cave[to]) {
                cave[to].push(from)
            } else {
                cave[to] = [from]
            }
        }
    })
    const res = [];

    const move = (key, visited): [string, string][] => {
        if (!cave[key]) {
            res.push([...visited, key]);
            return;
        }
        const result = [];
        cave[key].map(it => {
            if (!visited.includes(it.toLowerCase())) {
                move(it, [...visited, key])
            }
        })
        return result
    }

    move('start', [])

    const paths = res.filter(it => it[it.length - 1] === 'end')
    return paths.length;
}

const part2 = (data) => {
    const cave = {};

    data.forEach(it => {
        const [from, to] = it;
        
        if (from !== 'end') {
            if (cave[from]) {
                cave[from].push(to)
            } else {
                cave[from] = [to]
            }
        }
        

        if (to !== 'end') {
            if (cave[to]) {
                cave[to].push(from)
            } else {
                cave[to] = [from]
            }
        }
    })
    const res = [];

    const move = (key, visited, t): [string, string][] => {
        if (!cave[key]) {
            res.push([...visited, key]);
            return;
        }
        const result = [];
        cave[key].map(it => {
            if (!visited.includes(it.toLowerCase())) {
                move(it, [...visited, key], t)                    
            } else {
                if (!t && it !== 'start') {
                    move(it, [...visited, key], true)                    
                }
            }
        })
        return result
    }

    move('start', [], false)

    const paths = res.filter(it => it[it.length - 1] === 'end')
    return paths.length;
}

const parse = (raw) => {
    return raw
        .split('\n')
        .map(it.split('-'))
}

const day = 12
const prod = 1

const parsedData = parse(read(day, prod))
console.time('part 1')
console.log(part1(parsedData));
console.timeEnd('part 1')
console.time('part 2')
console.log(part2(parsedData));
console.timeEnd('part 2')