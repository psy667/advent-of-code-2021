import { max, min, mul, read, sum } from "./utils"

const toInt = (str) => parseInt(str, 2)

type Tuple<T, K> = [T, K]
type Int = number;

enum Types {
    Sum = 0,
    Product = 1,
    Min = 2,
    Max = 3,
    Literal = 4,
    GT = 5,
    LT = 6,
    EQ = 7,
}

type PacketLiteral = {
    version: number,
    type: Types.Literal,
    value: number,
}

type Packet = PacketLiteral | PacketNode

type PacketNode = {
    version: number,
    type: Exclude<Types, Types.Literal> ,
    children: Packet[],
}


const parser = {
    version: (str): Tuple<Int, Int> => [toInt(str.slice(0, 3)), 3],
    type: (str): Tuple<Int, Int> => [toInt(str.slice(0, 3)), 3],
    lenType: (str): Tuple<Int, Int> => [toInt(str[0]), 1],
    parseTotalLength: (str): Tuple<Int, Int> => [toInt(str.slice(0, 15)), 15],
    parseNumberOfPackets: (str): Tuple<Int, Int> => [toInt(str.slice(0, 11)), 11],
    parseLiteralValue: (str): Tuple<Int, Int> => {
        let pointer = 0;

        let keeping;
        let value = '';

        do {
            const [isKeeping, val] = [str.slice(pointer)[0], str.slice(pointer + 1, pointer + 5)];
            keeping = toInt(isKeeping);
            value += val;
            pointer += 5;
        } while (keeping)

        return [
            toInt(value),
            pointer,
        ]
    },
    parsePacket: (str): Tuple<Packet, Int> => {
        let pointer = 0;

        const [version, p1] = parser.version(str.slice(pointer));
        pointer += p1

        const [type, p2] = parser.type(str.slice(pointer));
        pointer += p2

        if (type == Types.Literal) {
            const [value, p3] = parser.parseLiteralValue(str.slice(pointer))
            return [{
                version,
                type,
                value,
            }, pointer + p3]
        } else {
            const [children, p3] = parser.parseOperator(str.slice(pointer))
            return [{
                version,
                type,
                children,
            }, pointer + p3]
        }
        
    },
    parseOperator: (str): Tuple<Packet[], Int> => {
        let pointer = 0;

        const [lenType] = parser.lenType(str);
        
        pointer++;

        if (lenType == 1) {
            const [numberOfPackets, p] = parser.parseNumberOfPackets(str.slice(pointer));
            pointer += p;
            let res = [];

            for (let i = 0; i < numberOfPackets; i++) {
                const [v, p] = parser.parsePacket(str.slice(pointer))
                pointer += p;
                res.push(v)
            }
            return [res, pointer];
        } else {
            const [v, p] = parser.parseTotalLength(str.slice(pointer))
            pointer += p;
            let res = [];
            const n = pointer + v;
            while (pointer < n) {
                const [v, p] = parser.parsePacket(str.slice(pointer))
                pointer += p;
                res.push(v)
            }
            return [res, pointer];
        }
    }
}


const part1 = (data) => {
    const tree = parser.parsePacket(data);

    const iter = (node) => {

        return node.version
            + (Array.isArray(node.value) ? node.value.map(it => iter(it)).reduce(sum) : 0)
    }

    return iter(tree[0]);
}

const part2 = (data) => {
    const tree = parser.parsePacket(data);

    const iter = (node: Packet) => {
        if (node.type == Types.Literal) {
            return node.value
        }
        const values = node.children.map(iter)
        switch (node.type) {
            case Types.Sum:
                return values.reduce(sum)
            case Types.Product: 
                return values.reduce(mul)
            case Types.Min:
                return values.reduce(min)
            case Types.Max:
                return values.reduce(max)
            case Types.LT:
                return values.reduce((a, b) => a < b)
            case Types.GT:
                return values.reduce((a, b) => a > b)
            case Types.EQ:
                return values.reduce((a, b) => a == b)
        }
    }

    return iter(tree[0]);
}

const generateCode = (data) => {
    const tree = parser.parsePacket(data);

    const iter = (node: Packet, deep = 1) => {
        if (node.type == Types.Literal) {
            return node.value
        }

        const prefix = ''.repeat(deep)
        const values = node.children.map(it => prefix + iter(it, deep + 1))
        switch (node.type) {
            case Types.Sum:
                return `(+ ${values.join(' ')})`
            case Types.Product: 
                return `(* ${values.join(' ')})`
            case Types.Min:
                return `(min ${values.join(' ')})`
            case Types.Max:
                return `(max ${values.join(' ')})`
            case Types.LT:
                return `(< ${values.join(' ')})`
            case Types.GT:
                return `(> ${values.join(' ')})`
            case Types.EQ:
                return `(= ${values.join(' ')})`
        }
    }

    return iter(tree[0]);
}

const parse = (raw) => {
    const res = raw
        .split('') 
        .map(it => 
            parseInt(it, 16) 
                .toString(2).padStart(4, '0')
    ).join('')
    return res;
}

const day = 16
const prod = 1

const parsedData = parse(read(day, prod))
console.time('part 1')
console.log(part1(parsedData));
console.timeEnd('part 1')
console.time('part 2')
console.log(part2(parsedData));
console.timeEnd('part 2')