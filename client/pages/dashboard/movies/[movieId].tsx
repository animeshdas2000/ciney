import { css } from "@emotion/react";
import axios from "axios";
import { STATES } from "mongoose";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io(process.env.SOCKET_SERVER || "http://localhost:5000");

function Movie() {
  const router = useRouter();
  const { movieId } = router.query;
  //const [userName, setUserName] = useState<string>("");
  const [movieName, setMovieName] = useState("");
  const [movieduration, setMovieDuration] = useState(0);
  const [movie_id, setMovie_id] = useState("");
  const [selected, setSelected] = useState<any[]>([]);
  const [seats, setSeats] = useState<any[]>([]);

  const fetchMovie = async () => {
    try {
      const res = await axios.get(`/api/movies/${movieId}`);
      setMovieName(res.data.name);
      setMovieDuration(res.data.duration);
      setSeats(res.data.seats);
      setMovie_id(res.data.movie_id);

      socket.emit("join_movie_queue", res.data.movie_id);
    } catch (error) {
      console.log(error);
    }
  };

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

  const addToOrder = (seat: any) => {
    if (seat.isBooked) return;
    if (!seat.isBooked) {
      seat.isBooked = "isSelected";
      blockSeat(seat, false);
      setSelected((state) => [...state, seat]);
      return;
    }
    // if (seat.isBooked === "isSelected") {
    //   seat.isBooked = false;
    //   blockSeat(seat, false);
    //   setSeats((state) => [...state, seat]);
    //   return;
    // }
    seat.isBooked = "isSelected";
    blockSeat(seat, true);
  };

  const placeOrder = async () => {
    if (selected.length > 0) {
      selected.map((seat) => (seat.isBooked = true));
      try {
        const res = await axios.post(`/api/booking`, {
          id: "Testing",
          name: "userName",
          movie: movieId,
          seats: selected,
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
      router.push(`/`);
    } else {
      console.log("Please select seats");
    }

    //console.log("Order placing");
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
  //console.log(selected);
  return (
    <>
      <div className="mx-10 text-center">
        <h3 className="font-bold text-3xl">{movieName}</h3>
        <p>Duration: {movieduration}</p>
        <p>Movie ID: {movie_id}</p>
        <button
          className={
            selected.length === 0
              ? "bg-gray-400 rounded-lg px-4 py-2 font-bold text-gray-700"
              : "bg-blue-800 rounded-lg px-4 py-2 font-bold text-white"
          }
          onClick={placeOrder}>
          Book {selected.length} tickets
        </button>
        {/* 
        <p>Hey can we get your name?</p>
        <input
          type="text"
          placeholder="Your Name"
          className="border-none bg-slate-100 font-semibold rounded-lg"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          required
        /> */}
        <div className="flex flex-wrap justify-between">
          {uniqueObjArray?.map((seat, key) => {
            return (
              <span
                key={key}
                className={`p-5 m-4 w-16 rounded-lg ${
                  seat.isBooked === true
                    ? "bg-red-600"
                    : seat.isBooked === "isSelected"
                    ? "bg-green-500"
                    : seat.isBooked === "isBlocked"
                    ? "bg-gray-500"
                    : "bg-gray-200"
                }`}
                onClick={() => {
                  addToOrder(seat);
                }}>
                {seat.row}
                {seat.col}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Movie;
