import { read } from "./utils";

type Data = {
  input: number[]
  matrix: Matrix[]
}

type Matrix = {val: number, mark: boolean}[][]

const part1 = data => {
  let matrix = data.matrix;
  let result;
  data.input.forEach(it => {
      if(result) {
          return;
      }
      matrix.forEach((mat) => {
          mat.forEach(row => {
              row.forEach(col => {
                  if(col.val === it) {
                      col.mark = true;
                  }
              })
          })
      })

      matrix.forEach((mat) => {
          const len = mat[0].length;
          for(let i = 0; i < len; i++) {
              let res = 0;
              for (let k = 0; k < len; k++) {
                  res += Number(mat[i][k].mark);
              }
              if(res === len) {
                result = {lastVal: it, mat: mat};
              }
          }

          for(let i = 0; i < len; i++) {
              let res = 0;
              for(let k = 0; k < len; k++) {
                  res += Number(mat[k][i].mark);
              }
              if(res === len) {
                result = {lastVal: it, mat: mat};
              }
          }
      })
  });

  let sum = result.mat.reduce((acc,cur) => acc + cur.reduce((s,c) => s + (c.mark ? 0 : c.val), 0), 0) // ?

  return result.lastVal * sum
}


const part2 = (data: Data) => {
  let matrix = data.matrix;
  let result;
  data.input.forEach(it => {
      let toRemove = [];

      if(result) {
          return;
      }
      matrix.forEach((mat) => {
          mat.forEach(row => {
              row.forEach(col => {
                  if(col.val === it) {
                      col.mark = true;
                  }
              })
          })
      })

      matrix.forEach((mat,matIdx) => {
          const len = mat[0].length;
          for(let i = 0; i < len; i++) {
              let res = 0;
              for (let k = 0; k < len; k++) {
                  res += Number(mat[i][k].mark);
              }
              if(res === len) {
                  toRemove.push(matIdx);
              }
          }

          for(let i = 0; i < len; i++) {
              let res = 0;
              for(let k = 0; k < len; k++) {
                  res += Number(mat[k][i].mark);
              }
              if(res === len) {
                  toRemove.push(matIdx);
              }
          }
      })
      if(matrix.length === 1 && toRemove.length > 0) {
          result = {lastVal: it, mat: matrix[0]};
      }
      matrix = matrix.filter((_,idx) => toRemove.indexOf(idx) === -1);
  });

  let sum = result.mat.reduce((acc,cur) => acc + cur.reduce((s,c) => s + (c.mark ? 0 : c.val), 0), 0) // ?

  return result.lastVal * sum
}


const parse = (raw: string): Data => {
  const [input, _, ...rawMatrix] = raw.split('\n');

  const matrix = rawMatrix.reduce((acc,cur) => {
      let newAcc = acc;
      if(cur === '') {
          newAcc.arr.push(acc.last)
          newAcc.last = [];
      } else {
        newAcc.last.push(
          cur
            .split(' ')
            .filter(Boolean)
            .map(Number)
            .map(it => ({ val: it, mark: false }))
        )
      }
      return newAcc;
  }, {arr: [], last: []})

  return {input: input.split(',').map(it => Number(it)), matrix: [...matrix.arr, matrix.last]}
}

const day = 4;
const prod = true;

const parsedData = parse(read(day, prod))
console.time('part 1')
console.log(part1(parsedData));
console.timeEnd('part 1')
console.time('part 2')
console.log(part2(parsedData));
console.timeEnd('part 2')