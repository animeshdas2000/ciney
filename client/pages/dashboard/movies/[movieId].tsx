import React, { useEffect, useState } from "react";
import { EventSeat, EventSeatOutlined } from "@mui/icons-material";
import { io } from "socket.io-client";
import axios from "axios";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { Container } from "@mui/material";
const socket = io("http://localhost:5000");

interface IOSeatData {
  row: string;
  col: number;
  isBooked: boolean | string;
  _id: string;
}
[];

function Movie() {
  const [movieName, setMovieName] = useState("");
  const [movieduration, setMovieDuration] = useState(0);
  const [seats, setSeats] = useState([]);
  const [movie_id, setMovie_id] = useState("");
  // const [selectedSeats, setSelectedSeats] = useState<
  //   Array<{ room: string; seatId: string; state: boolean }>
  // >([]); //define type
  const [recievedSeats, setRecievedSeats] = useState<
    Array<{ room: string; seatId: string; state: boolean }>
  >([]);
  const [seatData, setSeatData] = useState<IOSeatData>({
    row: "",
    col: 0,
    isBooked: true,
    _id: "",
  });

  let seatForOrder: any[] = [];
  const [seatOrder, setSeatOrder] = useState<any[]>([]);
  let arrRec: any[] = [];
  const router = useRouter();
  const { movieId } = router.query;

  // const addOrder = async (data: any) => {
  //   if (data.isBooked) return;
  //   if (data.status === "isSelected") {
  //     setSeatData((prevState) => ({
  //       ...prevState,
  //       seat: data,
  //       seatStatus: "isSelected",
  //       state: false,
  //     }));

  //     seatForOrder.splice(seatForOrder.indexOf(data._id), 1);
  //     seatBlock(data);
  //     return;
  //   }
  //   seatForOrder.push(data);
  //   seatBlock(data);
  // };

  const seatBlock = (seat: any) => {
    socket.emit("block-seats", {
      row: seat.row,
      col: seat.col,
      _id: `${seat._id}`,
      isBooking: "isBlocked",
    });
  };

  const tempBook = (data: any) => {
    console.log(data);
    const seatVal = data.find((e: any) => e.seatId === data._id);
    if (seatVal === undefined) return;
    console.log(seatVal);
    setSeats(seatVal);
  };
  const bookTicket = async () => {
    try {
      const res = await axios.post("/api/booking", {
        id: `${movie_id}-${Math.random}`,
        name: "User",
        movie: movieId,
        seat: seatOrder,
      }); //add seat
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMovie = async () => {
    try {
      const res = await axios.get(`/api/movies/${movieId}`);
      console.log(res.data);
      setMovieName(res.data.name);
      setMovieDuration(res.data.duration);
      // setSeatData(res.data.seats);
      setSeats(res.data.seats);
      console.log(res.data.seats);
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
  }, [movieId]);

  useEffect(() => {
    socket;
    socket.on("recieve-blocked-seats", tempBook);
    // socket.on(
    //   "recieve-blocked-seats",
    //   (seat: Set<{ room: string; seatId: string; state: boolean }>) => {
    //     arrRec.push(...recievedSeats, seat);
    //     setRecievedSeats(arrRec);
    //   }
    // );
  }, []);
  // console.log(recievedSeats);
  console.log(seatOrder);
  return (
    <>
      <div>
        <p>{movieName ?? ""}</p>
        <p>{movieduration ?? ""}</p>
        <button onClick={bookTicket}>Book Tickets {seatOrder.length}</button>
        <Container className="overflow-x-visible">
          <div className="flex flex-row flex-wrap justify-between ">
            {/* {seats?.map((seat: any, seatId: any) => {
            return (
              <div
                css={css`
                  margin: 10px;
                `}
                key={seat.seat_num}
                onClick={() => {
                  addOrder(seat.seat_num);
                }}>
                {Object.keys(recievedSeats) ? (
                  <p className="text-orange-600">{seat.seat_num}</p>
                ) : recievedSeats.includes(seat.seat_num) ? (
                  <p className="text-red-600 bg-slate-300">{seat.seat_num}</p>
                ) : seat.isBooked ? (
                  <p className="text-gray-700 bg-slate-300">{seat.seat_num}</p>
                ) : (
                  <p className="text-green-600 bg-slate-300">{seat.seat_num}</p>
                )}
              </div>
            );
          })} */}
            {seats?.map((seatVal: any, key: any) => {
              return (
                <p
                  key={key}
                  className={`m-4 bg-gray-300 rounded p-4 ${
                    seatVal.isBooked
                      ? "text-red-600"
                      : !seatVal.isBooked
                      ? "text-green-600"
                      : "text-black"
                  }`}
                  onClick={() => {
                    //addOrder(seatVal);
                    // seatForOrder.push(...seatForOrder, seatVal);
                    seatForOrder.push(...seatForOrder, seatVal);
                    setSeatOrder(seatForOrder);
                  }}>
                  {seatVal.row}
                  {seatVal.col}
                </p>
              );
            })}
          </div>
        </Container>
      </div>
    </>
  );
}

export default Movie;
// () => {
//   if (recievedSeats.includes(seat.seat_num)) {
//     return <p>Blocked</p>;
//   } else if (seat.isBooked) {
//     return <p style={{ color: "red" }}>{seat.seat_num}</p>;
//   } else {
//     <p style={{ color: "Green" }}>{seat.seat_num}</p>;
//   }
// }

// this.$set(seat, 'isTempUnavailable', params.state);

// set({
//   row,
//   col,
//   isBooked,
// },isTempUnavailable,true)
