import { mul, read, sum } from "./utils"


const part1 = (data) => {
    const lowPoints = [];
    const isLowPoint = (x, y) => {
        const v = data[x][y];
        
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (i === x && j === y) {
                    
                } else if (i === -1 || j === -1) {
                    
                } else if (i === data.length || j === data[0].length) {
                
                } else if (v >= data[i][j]) {
                    return false
                }
            }
        }
        return true;
    }
    
    for (let x = 0; x < data.length; x++) {
        for (let y = 0; y < data[0].length; y++) {
            if (isLowPoint(x, y)) {
                lowPoints.push(data[x][y])
            }
        }
    }
    lowPoints // 
    return lowPoints.map(i => i + 1).reduce(sum, 0) // ?
}

const part2 = (data) => {
    const checkedPoints = {}
    
    const exploreBasin = (x, y) => {
        if (x < 0 || y < 0 || x >= data.length || y >= data[0].length) {
            return 0;
        }

        if (data[x][y] === 9) {
            return 0;
        }
        const key = x + ':' + y;

        if (!checkedPoints[key]) {
            checkedPoints[key] = true;

            const up = exploreBasin(x-1, y)
            const down = exploreBasin(x+1, y)
            const left = exploreBasin(x, y - 1)
            const right = exploreBasin(x, y + 1)
            
            return 1 + up + down + left + right;
        } else {
            return 0;
        }
    }
    const getBasinVolume = (x, y) => {
        const v = data[x][y];
        
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (i === x && j === y) {
                    
                } else if (i === -1 || j === -1) {
                    
                } else if (i === data.length || j === data[0].length) {
                
                } else if (v >= data[i][j]) {
                    return 0
                }
            }
        }


        return exploreBasin(x,y);
    }
    const basins = [];

    for (let x = 0; x < data.length; x++) {
        for (let y = 0; y < data[0].length; y++) {
            const basin = getBasinVolume(x,y);
            if (basin) {
                basins.push(basin)
            }
        }
    }
    return basins.sort((a,b) => b - a).slice(0,3).reduce(mul, 1) // ?
}



const parse = (raw) => {
  return raw
      .split('\n').map(it => it.split('').map(Number))
}

const day = 9;
const prod = true;

const parsedData = parse(read(day, prod))
console.time('part 1')
console.log(part1(parsedData));
console.timeEnd('part 1')
console.time('part 2')
console.log(part2(parsedData));
console.timeEnd('part 2')