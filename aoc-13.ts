import { read, sum, max } from "./utils"

const draw = (matrix, sizeX, sizeY) => {
    console.clear();
    console.log(matrix.slice(0, sizeY).map(it => it.slice(0, sizeX).map(i => i ? '█' : ' ').slice(0, 360).join('')).slice(0, 100).join('\n'))
    console.log('\n'.repeat(3))
}
const part1 = ({coords, foldings}) => {
    let sizeX = coords.map(it => it[0]).reduce(max, -Infinity) + 1;
    let sizeY = coords.map(it => it[1]).reduce(max, -Infinity) + 1;

    const matrix = new Array(sizeY).fill(0).map(it => new Array(sizeX).fill(0));

    const foldY = (n) => {
        for (let i = 1; i <= Math.min(n, sizeY - n - 1); i++) {
            for (let j = 0; j < sizeX; j++) {
                const x1 = j;
                const y1 = n - i;
                const x2 = j;
                const y2 = n + i;
                
                matrix[y1][x1] = matrix[y1][x1] || matrix[y2][x2]
            }
        }
        sizeY = n;

    }

    const foldX = (n) => {
        for (let j = 0; j < sizeY; j++) {
            for (let i = 1; i <= Math.min(n, sizeX - n - 1); i++) {
                const x1 = n - i;
                const y1 = j;
                const x2 = n + i;
                const y2 = j;

                matrix[y1][x1] = matrix[y1][x1] || matrix[y2][x2]
            }
        }
        sizeX = n;
    }

    coords.forEach(([x, y]) => {
        matrix[y][x] = 1;
    })
    
    foldings.slice(0, 1).map(([axis, n]) => {
        const v = parseInt(n);
        
        if (axis === 'x') {
            foldX(v)
        } else {
            foldY(v)
        }
    })

    return matrix.slice(0, sizeY).map(it => it.slice(0, sizeX).reduce(sum)).reduce(sum)
}

function* part2 ({coords, foldings}) {
    let sizeX = coords.map(it => it[0]).reduce(max, -Infinity) + 1;
    let sizeY = coords.map(it => it[1]).reduce(max, -Infinity) + 1;

    const matrix = new Array(sizeY).fill(0).map(it => new Array(sizeX).fill(0));

    const foldY = (n) => {
        for (let i = 1; i <= Math.min(n, sizeY - n - 1); i++) {
            for (let j = 0; j < sizeX; j++) {
                const x1 = j;
                const y1 = n - i;
                const x2 = j;
                const y2 = n + i;
                
                matrix[y1][x1] = matrix[y1][x1] || matrix[y2][x2]
            }
        }
        sizeY = n;

    }

    const foldX = (n) => {
        for (let j = 0; j < sizeY; j++) {
            for (let i = 1; i <= Math.min(n, sizeX - n - 1); i++) {
                const x1 = n - i;
                const y1 = j;
                const x2 = n + i;
                const y2 = j;

                matrix[y1][x1] = matrix[y1][x1] || matrix[y2][x2]
            }
        }
        sizeX = n;
    }

    coords.forEach(([x, y]) => {
        matrix[y][x] = 1;
    })
    
    for (let [axis, n] of foldings) {
        const v = parseInt(n);
        
        if (axis === 'x') {
            foldX(v)
        } else {
            foldY(v)
        }
        yield draw(matrix, sizeX, sizeY);
    }
}

const parse = (raw) => {
    const foldings = raw
        .split('\n')
        .filter(it => it.startsWith('fold along') && it.length)
        .map(it => it.split(' ')[2].split('='))
    
    const coords = raw
        .split('\n')
        .filter(it => !it.startsWith('fold along') && it.length)
        .map(it => it.split(',').map(Number))
    
    return {
        coords, foldings
    }
}

const day = 13
const prod = 1

const parsedData = parse(read(day, prod))
const a = part2(parsedData);

// console.clear()
// console.log(('█'.repeat(350) + '\n').repeat(100))
setInterval(a.next, 500)

// console.time('part 1')
// console.log(part1(parsedData));
// console.timeEnd('part 1')
// console.time('part 2')
// console.log(part2(parsedData));
// console.timeEnd('part 2')

