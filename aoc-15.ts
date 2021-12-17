import { forXY, read, sum } from "./utils"

const draw = (matrix, sizeX, sizeY) => {
    console.log(matrix.slice(0, sizeY).map(it => it.slice(0, sizeX).map(i => i.toString().padStart(3, ' ')).slice(0, 360).join('')).slice(0, 100).join('\n'))
    console.log('\n'.repeat(3))
}
const part1 = (data) => {
    const size = data.length;
    const matrix = new Array(size).fill(0).map(it => new Array(size).fill(100));

    matrix[0][0] = 0;

    forXY(size, size, (y, x) => {
        if (x === 0 && y === 0) {
            return;
        }

        const left = x === 0 ? Infinity : matrix[y][x - 1]
        const top = y === 0 ? Infinity : matrix[y - 1][x]

        const v = Math.min(left, top);

        matrix[y][x] = data[y][x] + v
    })

    forXY(size, size, (y, x) => {
        if (x === 0 && y === 0) {
            return;
        }

        const left = x === 0 ? Infinity : matrix[y][x - 1]
        const top = y === 0 ? Infinity : matrix[y - 1][x]
        const right = x === size - 1 ? Infinity : matrix[y][x + 1]
        const bottom = y === size - 1 ? Infinity : matrix[y + 1][x]

        const v = Math.min(left, top, right, bottom);

        matrix[y][x] = data[y][x] + v
    })

    // draw(matrix, size, size)

    let x = size - 1;
    let y = size - 1;
    let res = 0;
    const path = [];

    while (x > 0 || y > 0) {
        res += data[y][x]
        path.push(data[y][x])

        const [minY, minX] = [[1, 0], [0, 1], [-1, 0], [0, -1]].reduce((acc, cur) => {
            const curY = y + cur[0];
            const curX = x + cur[1];
            const prevY = y + acc[0];
            const prevX = x + acc[1]


            if (curY < 0 || curX < 0 || prevY < 0 || prevX < 0) {
                return acc;
            }
            if (curY == size || curX == size || prevY == size || prevX == size) {
                return acc;
            }

            const val = matrix[curY][curX]
            const prev = matrix[prevY][prevX]

            if (val < prev) {
                return cur
            } else {
                return acc
            }
        }, [0, 0])

        y += minY
        x += minX
    }
    // res += data[y][x]
    // res -= data[0][0]

    // console.log(path);
    path.reduce(sum, 0) //?  
    return res // ?
}
const visited = {};



const part2 = (data) => {
    const s = 1;
    const size = data.length * s;
    const matrix = new Array(size).fill(0).map(it => new Array(size).fill(99));

    matrix[0][0] = 0;

    const getValue = (y, x) => {
        const xi = x % s;
        const yi = y % s;
    
        const xk = Math.floor(x / s); // ?
        const yk = Math.floor(y / s); // ?
    
        const xj = ((data[yi][xi] - 1 + xk + yk) % 9 + 1)
    
        return xj;
    };

    // forXY(size, size, (y, x) => {
    //     if (x === 0 && y === 0) {
    //         return;
    //     }

    //     const left = x === 0 ? Infinity : matrix[y][x - 1]
    //     const top = y === 0 ? Infinity : matrix[y - 1][x]

    //     const v = Math.min(left, top);

    //     matrix[y][x] = data[y][x] + v
    // })


    let stop = false;
    let i = 0;
    // let k = 0;
    while (i !== size) {
        let y = 0;

        for (let x = i; x >= 0; x--) {
            const left = x === 0 ? Infinity : matrix[y][x - 1]
            const top = y === 0 ? Infinity : matrix[y - 1][x]
            // const right = x === size - 1 ? Infinity : matrix[y][x + 1]
            // const bottom = y === size - 1 ? Infinity : matrix[y + 1][x]
            if (x == 0 && y == 0) {
                
            } else {
                const v = Math.min(left, top);

                matrix[y][x] = data[y][x] + v
                
                y++;
            }
            
        }

        i++;
    }
    i--;
    while (i !== 0) {
        let x = size-1;
        for (let y = (size) - i; y < size; y++) {
            const left = x === 0 ? Infinity : matrix[y][x - 1]
            const top = y === 0 ? Infinity : matrix[y - 1][x]
            // const right = x === size - 1 ? Infinity : matrix[y][x + 1]
            // const bottom = y === size - 1 ? Infinity : matrix[y + 1][x]
            if (x == 0 && y == 0) {
                
            } else {
                const v = Math.min(left, top);

                matrix[y][x] = data[y][x] + v
                
                x--;
            }
            
        }

        i--;
    }

    draw(matrix, size, size)

    // forXY(size, size, (y, x) => {
    //     if (x === 0 && y === 0) {
    //         return;
    //     }

    //     const left = x === 0 ? Infinity : matrix[y][x - 1]
    //     const top = y === 0 ? Infinity : matrix[y - 1][x]
    //     const right = x === size - 1 ? Infinity : matrix[y][x + 1]
    //     const bottom = y === size - 1 ? Infinity : matrix[y + 1][x]

    //     const v = Math.min(left, top, right, bottom);

    //     matrix[y][x] = getValue(y, x) + v
    // })




    let x = size - 1;
    let y = size - 1;
    let res = 0;
    const path = [];

    while (x > 0 || y > 0) {
        res += getValue(y, x)
        path.push(getValue(y, x))

        const [minY, minX] = [[1, 0], [0, 1], [-1, 0], [0, -1]].reduce((acc, cur) => {
            const curY = y + cur[0];
            const curX = x + cur[1];
            const prevY = y + acc[0];
            const prevX = x + acc[1]


            if (curY < 0 || curX < 0 || prevY < 0 || prevX < 0) {
                return acc;
            }
            if (curY == size || curX == size || prevY == size || prevX == size) {
                return acc;
            }

            const val = matrix[curY][curX]
            const prev = matrix[prevY][prevX]

            if (val < prev) {
                return cur
            } else {
                return acc
            }
        }, [0, 0])

        y += minY
        x += minX
    }
    // res += getValue(y, x)
    // res -= data[0][0]

    // console.log(path);
     //?  
    return path.reduce(sum, 0) // ?
}

const parse = (raw) => {
    return raw
        .split('\n')
        .map(it => it.split('').map(Number))
}

const day = 15
const prod = 0

const parsedData = parse(read(day, prod))
console.time('part 1')
console.log(part1(parsedData));
console.timeEnd('part 1')
console.time('part 2')
console.log(part2(parsedData));
console.timeEnd('part 2')