import { read } from "./utils";
type Coord = {x: number, y: number}
type Line = [Coord, Coord]

const size = 1000;

const part1 = (data: Line[]) => {
    const matrix = new Array(size).fill(0).map(it => new Array(size).fill(0));

    data.forEach(it => {
        const [point1, point2] = it;
        
        if (point1.y == point2.y) {
            const fromX = Math.min(point1.x, point2.x);
            const toX = Math.max(point1.x, point2.x);

            for (let x = fromX; x <= toX; x++) {
                matrix[point1.y][x] = matrix[point1.y][x] + 1;
                // matrix[y][point2.x] = 1;
            }
        }
    
        if (point1.x == point2.x) {
            const fromY = Math.min(point1.y, point2.y);
            const toY = Math.max(point1.y, point2.y);

            for (let y = fromY; y <= toY; y++) {
                matrix[y][point1.x] = matrix[y][point1.x] + 1;
                // matrix[y][point2.x] = 1;
            }
            
        }
    })

    const overlaps = matrix
        .reduce((acc, row) => acc + row
            .reduce((a, col) => col > 1 ? a + 1 : a, 0)
        , 0);

    return overlaps;
}

const part2 = (data: Line[]) => {
    const matrix = new Array(size).fill(0).map(it => new Array(size).fill(0));

    data.forEach(it => {
        const [point1, point2] = it;
        
        const d1 = Math.abs(point1.x - point2.x);
        const d2 = Math.abs(point1.y - point2.y);
        
        if (d1 == d2) {
            for (let k = 0; k <= d1; k++) {
            
                const cX = point1.x + (point1.x < point2.x ? k : -k);
                const cY = point1.y + (point1.y < point2.y ? k : -k);
                matrix[cY][cX] = matrix[cY][cX] + 1;

            }
        }

        if (point1.y == point2.y) {
            const fromX = Math.min(point1.x, point2.x);
            const toX = Math.max(point1.x, point2.x);

            for (let x = fromX; x <= toX; x++) {
                matrix[point1.y][x] = matrix[point1.y][x] + 1;
            }
        }
    
        if (point1.x == point2.x) {
            const fromY = Math.min(point1.y, point2.y);
            const toY = Math.max(point1.y, point2.y);

            for (let y = fromY; y <= toY; y++) {
                matrix[y][point1.x] = matrix[y][point1.x] + 1;
            }
            
        }
    })

    const overlaps = matrix
        .reduce((acc, row) => acc + row
            .reduce((a, col) => col > 1 ? a + 1 : a, 0)
        , 0);

    return overlaps;
}

const parse = (raw): Line[] => {
    return raw
        .split('\n')
        .map(it => it
            .split(' -> ')
            .map(it => {
                const [x, y] = it.split(',').map(Number)
                return { x, y }
            }))
}

const day = 5;
const prod = true;

const parsedData = parse(read(day, prod))
console.time('part 1')
console.log(part1(parsedData));
console.timeEnd('part 1')
console.time('part 2')
console.log(part2(parsedData));
console.timeEnd('part 2')
