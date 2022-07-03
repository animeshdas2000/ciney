import React, { useEffect, useState } from "react";
import { EventSeat, EventSeatOutlined } from "@mui/icons-material";
import { io } from "socket.io-client";
import axios from "axios";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
const socket = io("http://localhost:5000");

function Movie() {
  // const [socket, setSocket] = useState(null);
  const [movieName, setMovieName] = useState("");
  const [movieduration, setMovieDuration] = useState(0);
  const [seats, setSeats] = useState<any[]>([]);
  const [seatsBooked, setSeatsBooked] = useState(0);
  // //Room State
  const [room, setRoom] = useState("");
  const [connected, setConnected] = useState(false);
  const [msg, setMsg] = useState("");
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]); //define type
  const [recievedSeats, setRecievedSeats] = useState<any[]>([]);
  const router = useRouter();
  const { movieId } = router.query;
  let arrSend: any[] = [];
  let arrRec: any[] = [];
  const fetchMovie = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/movies/${movieId}`
      );
      console.log(res.data);
      setMovieName(res.data.name);
      setMovieDuration(res.data.duration);
      setSeats(res.data.seats);
      setRoom(res.data.movie_id);
      socket.emit("join_movie_queue", res.data.movie_id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMovie();
  }, []);

  useEffect(() => {
    socket;

    socket.on("new-remote-operations", (seat: string) => {
      arrRec.push(...recievedSeats, seat);
      setRecievedSeats(arrRec);
    });
  }, []);
  console.log(recievedSeats);

  // useEffect(() => {

  //   // function cleanup() {
  //   //   socket.disconnect();
  //   // }
  //   // return cleanup;
  //   // socket.on('ne');
  // }, []);
  // const sendSeatsData = () => {
  //   socket.emit("send_message", () => {
  //     return selectedSeats;
  //   });
  // };

  // useEffect(() => {
  //   sendSeatsData();
  // }, [selectedSeats]);

  // useEffect(() => {
  //   // socket.on("receive", (data) => {
  //   //   return setRecievedSeats([...data.selectedSeats]); //here others selected seats change this to another state
  //   // });
  //   socket.on("connect", () => {
  //     console.log(socket.id);
  //   });
  //   socket.on("disconnect", () => {
  //     console.log(`Disconnected ${socket.id}`);
  //   });

  //   return () => {
  //     socket.off("connect", () => {
  //       console.log(socket.id);
  //     });
  //   };
  // }, [socket]);

  return (
    <>
      <div>
        <p>{movieName ?? ""}</p>
        <p>{movieduration ?? ""}</p>
        {/* <input type="text" onChange={(setMsg(e.target.value))} /> */}

        <div className="flex flex-row flex-wrap">
          {seats?.map((seat: any, seatId: any) => {
            return (
              <div
                css={css`
                  margin: 10px;
                `}
                key={seat.seat_num}
                onClick={
                  () => {
                    socket.emit("new-operations", seat.seat_num);
                    arrSend.push(...arrSend, seat.seat_num);
                    setSelectedSeats(arrSend);
                  } //send data
                  // setSelectedSeats((addedSeats) => [
                  //   ...addedSeats,
                  //   seat.seat_num,
                  // ])
                }>
                {selectedSeats.includes(seat.num) ? (
                  <p>{seat.seat_num}</p>
                ) : recievedSeats.includes(seat.seat_num) ? (
                  <p className="text-red-600 bg-slate-300">{seat.seat_num}</p>
                ) : seat.isBooked ? (
                  <p className="text-gray-700 bg-slate-300">{seat.seat_num}</p>
                ) : (
                  <p className="text-green-600 bg-slate-300">{seat.seat_num}</p>
                )}
              </div>
            );
          })}
        </div>
        <hr />
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
