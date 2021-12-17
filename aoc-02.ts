import { read } from "./utils";

type Move = { dir: string, val: number };

const pipe = (data) => {
    return {
        transform: (cb) => cb(data),
        data: data,
    }
}

const part2 = (data: Move[]) => pipe(data
    .reduce((acc,cur) => {
        const moving = {
            'forward': [cur.val * acc.aim, cur.val, 0],
            'down': [0, 0, cur.val],
            'up': [0, 0, -cur.val],
        };

        const [depthChng, posChng, aimChng] = moving[cur.dir];

        return {
            depth: acc.depth + depthChng,
            position: acc.position + posChng,
            aim: acc.aim + aimChng,
        } // ?
    }, { depth: 0, position: 0, aim: 0 }) // ?
    ).transform(({depth, position}) => depth * position)

const parse = (raw: string): Move[] => {
    return raw.split('\n').map(it => {
        const [dir, val] = it.split(' ')
        return {dir, val: Number(val)}
    })
}


const day = 2;
const prod = true;

console.log(part2(parse(read(day, prod))));