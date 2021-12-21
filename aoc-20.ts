import { read, sum } from "./utils"



const part1 = (data, c = 2, t = 0) => {
    const [alg, image] = data;
    c--;

    const algStr = alg[0].join('');
    const len = image.length;

    const getNeighbors = (y, x, t) => {
        let res = [];
        for (let i = x - 1; i <= x+1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                try {
                    const a = image[i][j];
                    if (a === undefined) {
                        res.push(t)
                    } else {
                        res.push(a);
                    }
                } catch (e) {
                    res.push(t);
                }
                
            }
        }
        return res;
    }

 
    const nt = Number(!t);
    const newImage = new Array(len + 2).fill(nt).map(it => new Array(len + 2).fill(nt));

    for (let y = 0; y < len + 2; y++) {
        for (let x = 0; x < len + 2; x++) {
            const neighbors = parseInt(getNeighbors(y - 1, x - 1, t).join(''), 2);

            const v = Number(algStr[neighbors]);
            newImage[x][y] = v;
        }
    }

    if (c !== 0) {
        return part1([alg, newImage], c, nt)        
    }
    
    return newImage.map(it => it.reduce(sum)).reduce(sum)
}

const part2 = (data) => {
    return part1(data, 50, 0)
}

const parse = (raw) => {
    return raw
        .split('\n\n').map(it => it.split('\n').map(it=>it.split('').map(it => it == '#' ? 1 : 0))) 
}

const day = 20
const prod = 1

const parsedData = parse(read(day, prod))
console.time('part 1')
console.log(part1(parsedData));
console.timeEnd('part 1')
console.time('part 2')
console.log(part2(parsedData));
console.timeEnd('part 2')