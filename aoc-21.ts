import { memoize, read } from "./utils"

function* dice() {
    let i = 1;
    while (true) {
        if (i === 101) {
            i = 1;
        }
        yield i
        i += 1
    }
}

const move = (n) => {
    return ((n - 1) % 10) + 1
}

const part1 = (data) => {
    const d = dice();
    let player1Score = 0;
    let player2Score = 0;
    let player1Pos = data[0];
    let player2Pos = data[1];
    let rolls = 0;

    while (player1Score < 1000 && player2Score < 1000) {
        if (true) {
            const [n1, n2, n3] = [d.next().value, d.next().value, d.next().value] as [number, number, number];

            player1Pos = move(player1Pos + n1 + n2 + n3);
            player1Score += player1Pos;
            rolls += 3;
        }
        if (player1Score < 1000) {
            const [n1, n2, n3] = [d.next().value, d.next().value, d.next().value] as [number, number, number];

            player2Pos = move(player2Pos + n1 + n2 + n3);
            player2Score += player2Pos;
            rolls += 3;
        }
    }

    return Math.min(player1Score, player2Score) * rolls;
}


const part2 = (data) => {
    const iter = memoize((startingPositions, startingScores, player) => {
        const wins = [0, 0]

        for (let it of [[3, 1], [4, 3], [5, 6], [6, 7], [7, 6], [8, 3], [9, 1]]) {
            const positions = startingPositions.slice(0);
            const scores = startingScores.slice(0);

            const [sum, universes] = it;
            positions[player] = (positions[player] + sum - 1) % 10 + 1;
            scores[player] += positions[player]

            if (scores[player] >= 21) {
                wins[player] = wins[player] + universes;
            } else {
                const deepwins = iter(positions.slice(0), scores.slice(0), player ? 0 : 1);
                wins[0] += deepwins[0] * universes;
                wins[1] += deepwins[1] * universes;
            }
        }
        return wins;

    });

    return Math.max(...iter(data, [0, 0], 0))
}

const parse = (raw) => {
    return raw
        .split('\n')
        .map(it=>parseInt(it.split(' ').pop(), 10))
}

const day = 21
const prod = 1

const parsedData = parse(read(day, prod))
console.time('part 1')
console.log(part1(parsedData));
console.timeEnd('part 1')
console.time('part 2')
console.log(part2(parsedData));
console.timeEnd('part 2')



