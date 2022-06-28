import React, { useState, useEffect } from "react";
import axios from "axios";
import { EventSeat, EventSeatOutlined } from "@mui/icons-material";
function Movies() {
  const [movies, setMovies] = useState<any[]>([]);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/movies`);
        console.log(res.data);
        setMovies(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovie();
  }, []);
  return (
    <div>
      {movies.map((val, key) => {
        return (
          <div key={key}>
            <p>{val.name}</p>
            <p>{val.duration}</p>
            <p>{val.movie_id}</p>
            <div className="flex flex-row flex-wrap">
              {val.seats?.map((seat: any, seatId: any) => {
                return (
                  <p key={seatId}>
                    {seat.seat_num}
                    {seat.isBooked ? <EventSeat /> : <EventSeatOutlined />}
                  </p>
                );
              })}
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default Movies;
