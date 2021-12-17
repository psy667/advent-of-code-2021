import { forXY, read } from "./utils"


const calc = (vel, target) => {
    let [x, y] = [0, 0]
    let [xV, yV] = vel
    let maxY = 0;

    for (let i = 0; i < 500; i++) {
        x += xV
        y += yV
        if (y > maxY) {
            maxY = y;
        }
        xV += xV < 0 ? 1 : xV > 0 ? -1 : 0
        yV -= 1
        if (
            x >= target[0][0] &&
            x <= target[0][1] &&
            y <= target[1][1] &&
            y >= target[1][0]
        ) {
            return maxY
        }

        if (
            x >= target[0][1] &&
            y <= target[1][0])
        {
            return null;
        }
    }
    return null;
}

const part1 = (target) => {
    let max = 0;
    const [xS, yS] = [500, 100]
    forXY(xS, 2 * yS, (x, y) => {
        const m = calc([x, y-yS], target);
        if (m > max) {
            max = m;
        }
    })
    return max;
}

const part2 = (target) => {
    let max = 0;
    let maxV = [];
    const [xS, yS] = [500, 100]
    forXY(xS, 2 * yS, (x, y) => {
        const m = calc([x, y-yS], target);
        if (m !== null) {
            max += 1;
            maxV = [x-xS, y-yS]
        }
    })
    return max;
}

const parse = (raw) => {
    return raw.slice(13).split(', ').map(it => it.slice(2).split('..').map(Number))
}

const day = 17
const prod = 1

const parsedData = parse(read(day, prod))
console.time('part 1')
console.log(part1(parsedData));
console.timeEnd('part 1')
console.time('part 2')
console.log(part2(parsedData));
console.timeEnd('part 2')