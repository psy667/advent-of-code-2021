import { cursorTo } from "readline";
import { it, read } from "./utils"

const plus = (a, b) => {
    if (!a) {
        return b;
    }
    const v = [
        ...a.map(it => ({ ...it, deep: it.deep + 1 })),
        ...b.map(it => ({ ...it, deep: it.deep + 1 }))
    ]

    let c = 0;
    while (c < 10000) {
        c++;
        const toExplode = v.findIndex(it => it.deep === 5)
        const toSplit = v.findIndex(it => it.val >= 10)
        if (toExplode == -1 && toSplit == -1) {
            c = 10000;
        }

        if (toExplode >= 0) {
            explode(v, toExplode)
        } else if (toSplit >= 0) {
            split(v, toSplit)
        }
    }

    return v;
}

const iter = (val, deep = 0, side = 0) => {
    const n1 = Array.isArray(val);

    if (n1) {
        return [...iter(val[0], deep + 1, 0), ...iter(val[1], deep + 1, 1)]
    } else {
        return [{ val, deep, side }]
    }
}

const toArr = (v) => {
    let str = '';
    let prevD = 1;
    let prevSide = 0;
    let prevVal = '?';
    let deep = 0;
    const res = [];

    for (let cur of v) {
        let d = prevD - cur.deep;
        if (d < 0) {
            res.push('['.repeat(-d))
        } else if (d > 0) {
            // res.pop()

            if (d === 1) {
                res.push(cur.val)
            } else {
                res.pop()
            }
            res.push(']'.repeat(d) + ',')
        } else {
        }
        if (d === 0 && cur.side === 1 && prevSide === 0) {
            res.push('[' + prevVal + ',' + cur.val + ']')
            res.push(',')
        }

        prevD = cur.deep;
        prevSide = cur.side;
        prevVal = cur.val;
        
        // if (prevD > cur.deep) {
            // res[res.length - 1] += ']'.repeat(d);
        // }
        

        // if (cur.side === 0) {
        //     if (prevSide === 1 && d === 0) {
        //         res[res.length - 1] += ']'.repeat(1);

        //         d += 1
        //     }
        //     if (prevD < cur.deep) {
        //         // str += '['.repeat(d) + cur.val + ', '
        //         res.push('['.repeat(d + 1) + cur.val)
        //     } else {
        //         res.push('['.repeat(d ) + cur.val)
        //     }
        // } else {
        //     str += cur.val
        //     res.push(cur.val)
            
        // }
        // prevD = cur.deep;
        // prevSide = cur.side;
    }
    res.pop()
    res[res.length - 1] += ']'.repeat(prevD - 1);
    const r = res.join('') // ?

    const arr = JSON.parse(r);
    arr // ?
    return arr;
    
    // return str + ']'.repeat(prevD);
    // 
    // return v.reduce((acc, cur) => {
        // if()

        // if (acc.v.deep < cur.deep) {
        //     return { str: acc.str + '['.repeat(cur.deep - acc.v.deep) + cur.val + ' ', v: cur }
        // } else if (acc.v.deep >= cur.deep) {
        //     return { str: acc.str + ']'.repeat(acc.v.deep - cur.deep) + cur.val + ' ', v: cur }
        // } else {
        //     return { str: acc.str + cur.val, v: cur }
        // }

        // if(acc.v.deep === cur.deep) {
        //     return {str: `${acc.str}${acc.v.val}, ${cur.val}`, v: cur}
        // } 

    // }, { str: '', v: { deep: 0 } }).str
}

const mod = (a,b) => a % b;
const div = (a,b) => Math.floor(a / b);
const chunk = (arr, n) => {
    return arr.reduce((acc, cur, idx) => {
        const j = mod(idx, n);
        const i = div(idx, n);
        if(j === 0){
            acc[i] = [];
        }
        acc[i][j] = cur;
        return acc;
    }, []);
}

const magnitude = (k) => {
    // let k = iter(v);

    // const a = toStr(v);
    let newArr = [];
    // k // ?
    for (let i = 4; i > 0; i--) {
        chunk(k, 2) // ?
            .map(([a, b]) => {
                // a.val // ?
                // b?.val // ?
                if (!b) {
                    newArr.push(a);
                } else {
                    if (a.deep == i) {
                        newArr.push({ val: a.val * 3 + b.val * 2, deep: a.deep - 1})
                    } else {
                        newArr.push(a)
                        newArr.push(b)
                    }
                }
        })
        k = newArr;
        newArr = [];
    }

    return k[0].val // ?
}

magnitude([[1, 2], [[3, 4], 5]]) // ? 
magnitude([[[[0,7],4],[[7,8],[6,0]]],[8,1]]) // ?
magnitude([[[[1,1],[2,2]],[3,3]],[4,4]]) // ?
magnitude([[[[3,0],[5,3]],[4,4]],[5,5]]) // ?
magnitude([[[[5,0],[7,4]],[5,5]],[6,6]]) // ?
magnitude([[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]) // ?


const explode = (v, idx) => {
    let a, b;
    let t;
    if (v[idx - 1]) {
        // a = {val: v[idx-1].val + v[idx].val, deep: 4}
        v[idx - 1].val += v[idx].val
        v[idx - 1].side = 0
        a = { val: 0, deep: 4, side: 1 };
    } else {
        a = { val: 0, deep: 4, side: 0 }
    }
    if (v[idx + 2]) {
        b = { val: v[idx + 2].val + v[idx + 1].val, deep: v[idx + 2].deep, side: v[idx + 2].side };
    } else {
        b = { val: 0, deep: 4, side: 1 }
    }

    if (v[idx - 1] && v[idx + 2]) {
        v[idx].val = 0;
        v[idx + 1].val = 0;
        v[idx + 1].side = 1;
        v.splice(idx, 3, a, b)
    } else if (!v[idx + 2]) {
        v[idx].val = 0;
        v[idx].side = 1;
        // v[idx + 1].val = 0;
        v.splice(idx, 2, a)
    } else {
        v[idx].val = 0;
        v[idx + 1].val = 0;
        v[idx + 1].side = 1;
        v.splice(idx, 3, a, b)
    }

}

const split = (v, idx) => {
    const val = v[idx].val;
    const deep = v[idx].deep + 1;
    const a = { val: Math.floor(val / 2), deep, side: 0 };
    const b = { val: Math.ceil(val / 2), deep, side: 1 };

    v.splice(idx, 1, a, b)
}

const part1 = (lines) => {
    let result = lines.reduce(plus)

    return magnitude(result) // ? 
} 

const part2 = (lines) => {
    let max = 0;

    for (let l1 of lines) {
        for (let l2 of lines) {
            const v = magnitude(plus(l1, l2));
            if (v > max) {
                max = v
            }
        }
    }

    return max; // ?
}

const parse = (raw) => {
    return raw
        .split('\n')
        .map(it => JSON.parse(it))
        .map(it => iter(it)) // ? .
}

const day = 18
const prod = 1

const parsedData = parse(read(day, prod))
console.time('part 1')
console.log(part1(parsedData));
console.timeEnd('part 1')
console.time('part 2')
console.log(part2(parsedData));
console.timeEnd('part 2')