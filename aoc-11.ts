import { read } from "./utils"

const a = [
    '',
    `6594254334
3856965822
6375667284
7252447257
7468496589
5278635756
3287952832
7993992245
5957959665
6394862637`,
    `8807476555
5089087054
8597889608
8485769600
8700908800
6600088989
6800005943
0000007456
9000000876
8700006848`,
    `0050900866
8500800575
9900000039
9700000041
9935080063
7712300000
7911250009
2211130000
0421125000
0021119000`
]

const part1 = (data: number[][]) => {
    let matrix = data;
    let counter = 0;

    const flash = (x, y) => {
        counter++;
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if ((i !== x || j !== y) && (i >= 0) && (j >= 0) && (i < data.length) && (j < data.length)) {
                    if (matrix[i][j] !== 0) {
                        matrix[i][j] += 1;
                        if (matrix[i][j] >= 10) {
                            matrix[i][j] = 0;
                            flash(i, j)
                        }
                    }
                }
            }
        }
    }

    for (let step = 1; step <= 100; step++) {
        for (let x = 0; x < data.length; x++) {
            for (let y = 0; y < data.length; y++) {
                matrix[x][y] += 1;
            }
        }
        

        for (let x = 0; x < data.length; x++) {
            for (let y = 0; y < data.length; y++) {
                if (matrix[x][y] >= 10) {
                    matrix[x][y] = 0;
                    flash(x, y)
                }
            }
        }


        
        // console.log(
        //     matrix.map((cur) => cur.join('')).join('\n')
        // )
    }
    return counter;
}

const part2 = (data) => {
    let matrix = data;
    let counter = 0;

    const flash = (x, y) => {
        counter++;
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if ((i !== x || j !== y) && (i >= 0) && (j >= 0) && (i < data.length) && (j < data.length)) {
                    if (matrix[i][j] !== 0) {
                        matrix[i][j] += 1;
                        if (matrix[i][j] >= 10) {
                            matrix[i][j] = 0;
                            flash(i, j)
                        }
                    }
                }
            }
        }
    }

    for (let step = 1; step <= 5000; step++) {
        let prevCounter = counter;
        for (let x = 0; x < data.length; x++) {
            for (let y = 0; y < data.length; y++) {
                matrix[x][y] += 1;
            }
        }
        let s = 0;

        for (let x = 0; x < data.length; x++) {
            for (let y = 0; y < data.length; y++) {
                if (matrix[x][y] < 10) {
                    s += 1;
                }
            }
        }
        
        for (let x = 0; x < data.length; x++) {
            for (let y = 0; y < data.length; y++) {
                if (matrix[x][y] >= 10) {
                    matrix[x][y] = 0;
                    flash(x, y)
                }
            }
        }

        if (prevCounter + 100 == counter) {
            // console.log({step, diff: counter - prevCounter})
            return step;
        }


        
        // console.log(
        //     matrix.map((cur) => cur.join('')).join('\n')
        // )
    }
    return undefined;
}

const parse = (raw) => {
    return raw
        .split('\n')
        .map(it => it.split('').map(Number))
}

const day = 11
const prod = 1

const parsedData = parse(read(day, prod))
console.time('part 1')
// console.log(part1(parsedData));
console.timeEnd('part 1')
console.time('part 2')
console.log(part2(parsedData));
console.timeEnd('part 2')

/*
6594254334
3856965822
6375667284
7252447257
7468496589
5278635756
3287952832
7993992245
5957959665
6394862637


8807476555
5089087054
8597889608
8485769600
8700908800
6600088989
6800005943
0000007456
9000000876
8700006848


8817476555
5089087054
8597889628
8485769602
8703918823
6636388989
6856705943
0572867456
9536823876
8740416848
*/