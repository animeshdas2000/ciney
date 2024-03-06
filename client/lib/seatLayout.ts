import { ISeat } from "./models/seat"

export const generateSeatLayout = (row: number, col: number) => {
  let arr: ISeat[] = []
  // let row = 4
  // let col = 4
  for (let j = 0; j < row; j++) {
    for (let i = 0; i < col; i++) {
      arr.push({
        row: i,
        col: j,
        status: "AVAILABLE",
      })
    }
  }
  return arr
}
