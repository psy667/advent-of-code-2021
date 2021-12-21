import { max, min, read, sum } from "./utils"

const splitByTwo = (str: string) => {
    const res = []
    for (let i = 0; i < str.length-1; i++) {
        res.push(str.slice(i, i+2))
    }
    return res;
}

const part1 = (data) => {
    const { seq, map } = data;

    const mapping = new Map(map.map(([k, v]) => [k, k[0] + v + k[1]]))

    let result = seq;

    for (let i = 0; i < 10; i++) {
        result = splitByTwo(result).map((it, idx) => {
            if (idx) {
                return (mapping.get(it) || it).slice(1)
            }
            return (mapping.get(it) || it)
        }).join('')
    }

    const counter: Record<string, number> = {};
    for (let i = 0; i < result.length; i++) {
        counter[result[i]] = (counter[result[i]] || 0) + 1
    }
    const max = Math.max(...Object.values(counter) as number[]) 
    const min = Math.min(...Object.values(counter) as number[])
    return max - min;
}

const part2 = (data) => {
    const { seq, map } = data;
    
    const mapping = new Map(map.map(([k,v]) => [k, k[0] + v + k[1]]))

    let result: Record<string, number> = {}
        
    splitByTwo(seq).map(it => result[it] = (result[it] || 0) + 1);

    for (let i = 0; i < 40; i++) {
        const newResult: Record<string, number> = {}
        Object.entries(result).forEach(([k, v]) => {
            const n = mapping.get(k) as string;
            const n1 = n.slice(0, 2);
            const n2 = n.slice(1, 3);
            
            newResult[n1] = (newResult[n1] || 0) + v;
            newResult[n2] = (newResult[n2] || 0) + v;
        })
        result = newResult
    }

    const counter: Record<string, number> = {};
    
    Object.entries(result).forEach(([k, v], idx) => {
        if (idx === 0) {
            const letter: string = k[0]
            counter[letter] = (counter[letter] || 0) + 1;
        }
        const letter: string = k[1]
        counter[letter] = (counter[letter] || 0) + v;
    });

    const values = Object.values<number>(counter);

    values.reduce(sum, 0) // ?

    const maxV = values.reduce(max, -Infinity) // ?
    const minV = values.reduce(min, Infinity) // ?

    return maxV - minV; // ?
}

const parse = (raw) => {
    const lines = raw
            .split('\n');

        return {
            seq: lines[0],
            map: lines.slice(2).map(it => it.split(' -> ') as [string, string])
        }
}

const day = 14
const prod = 1

const parsedData = parse(read(day, prod))
console.time('part 1')
console.log(part1(parsedData));
console.timeEnd('part 1')
console.time('part 2')
console.log(part2(parsedData));
console.timeEnd('part 2')