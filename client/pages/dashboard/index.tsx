import React, { useState } from "react";
import { useEffect } from "react";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { css } from "@emotion/react";
function Dashboard() {
  // useEffect(() => {

  // }, []);
  // const [col, setCol] = useState<number | null>(0);
  // let col = 26;
  // let row = 100;
  // let arr = [];
  // for (let j = 0; j <= row; j++) {
  //   for (let i = 65; i < 91; i++) {
  //     arr.push(`${String.fromCharCode(i)}${j}`);
  //   }
  // }

  let arr = new Array(26).fill(1);
  return (
    <div>
      <h1 className="text-5xl text-center">Dashboard</h1>
      <button className="border-gray-700 p-2 rounded-md border">Submit</button>
      <h3 className="text-lg text-center">Timer</h3>

      <div className="flex flex-row flex-wrap">
        {arr.map((val, key) => {
          return (
            <div key={key} className=" m-2 border-black border rounded-5xl">
              <EventSeatIcon />
              {val}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
