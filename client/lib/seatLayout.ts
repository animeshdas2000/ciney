export const generateSeatLayout = () => {
  let arr = [];
  let row = 2;
  for (let j = 0; j <= row; j++) {
    for (let i = 65; i < 91; i++) {
      arr.push({
        row: `${String.fromCharCode(i)}`,
        col: j,
        isBooked: false,
      });
    }
  }
  return arr;
};
