import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

function Movie() {
  const router = useRouter();
  const { movieId } = router.query;
  const [movieName, setMovieName] = useState("");
  const [movieduration, setMovieDuration] = useState(0);
  const [movie_id, setMovie_id] = useState("");
  // const [selected, setSelected] = useState(...new Map());
  const [seats, setSeats] = useState<any[]>([]);

  const fetchMovie = async () => {
    try {
      const res = await axios.get(`/api/movies/${movieId}`);
      //console.log(res.data);
      setMovieName(res.data.name);
      setMovieDuration(res.data.duration);
      // setSeatData(res.data.seats);
      setSeats(res.data.seats);
      setMovie_id(res.data.movie_id);

      socket.emit("join_movie_queue", res.data.movie_id);
    } catch (error) {
      console.log(error);
    }
  };

  const seatForOrder: any[] = [];
  useEffect(() => {
    if (movieId !== undefined) {
      fetchMovie();
    }
    // return () => {
    //   socket.emit("leave-room", movie_id);
    //   // socket.emit("disconnect");
    // };
  }, [movieId]);

  useEffect(() => {
    socket.on("temp-book-seat", tempBook);
  }, []);

  //console.log("uniqueObjArray", uniqueObjArray);

  const addToOrder = (seat: any) => {
    if (seat.isBooked) return;
    if (!seat.isBooked) {
      seat.isBooked = "isSelected";
      blockSeat(seat, false);
      return;
    }
    seat.isBooked = "isSelected";
    blockSeat(seat, true);
  };

  const blockSeat = (seat: any, state: boolean) => {
    //console.log("Sending blocked seats", seat);
    socket.emit("temp-book-seat", {
      row: seat.row,
      col: seat.col,
      room: movie_id,
      isBooked: "isBlocked",
      _id: `${seat._id}`,
      state: state,
    });
    //socket.on("temp-book-seat", tempBook);
  };
  //console.log("Before exe", seats);
  const tempBook = (params: any) => {
    //console.log("TempBook running", params);
    delete params.state;
    delete params.room;
    //const seat = seats.find(el => el._id === params._id);
    setSeats((state) => [...state, params]);
  };
  // console.log("After", seats);
  seats.sort();
  let uniqueObjArray = [
    ...new Map(seats.map((item) => [item["_id"], item])).values(),
  ];

  //console.log(uniqueObjArray);
  console.log(seatForOrder);
  return (
    <>
      <p>{movieName}</p>
      <p>{movieduration}</p>
      <p>{movie_id}</p>
      <div className="flex flex-wrap justify-between">
        {uniqueObjArray?.map((seat, key) => {
          return (
            <p
              key={key}
              className={`p-5 m-3 ${
                seat.isBooked
                  ? "bg-green-500"
                  : seat.isBooked === "isSelected"
                  ? "bg-red-800"
                  : seat.isBooked === "isBlocked"
                  ? "bg-blue-700"
                  : "bg-yellow-400"
              }`}
              onClick={() => {
                addToOrder(seat);
                seatForOrder.push(...seat._id);
              }}>
              {seat.row}
              {seat.col}
            </p>
          );
        })}
      </div>
    </>
  );
}

export default Movie;
