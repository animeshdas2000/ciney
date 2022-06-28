export const generateSeatLayout = () => {
  let arr = [];
  let row = 5;
  for (let j = 0; j <= row; j++) {
    for (let i = 65; i < 91; i++) {
      arr.push({
        seat_num: `${String.fromCharCode(i)}${j}`,
        isBooked: false,
      });
    }
  }
  return arr;
};
