import React, { useState } from "react";
import { useEffect } from "react";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { css } from "@emotion/react";
import axios from "axios";
function Dashboard() {
  const [movies, setMovies] = useState([]);

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
