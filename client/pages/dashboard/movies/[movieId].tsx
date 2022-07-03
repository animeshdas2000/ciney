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
  const [recievedSeats, setRecievedSeats] = useState([]);
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
      console.log(room);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMovie();
  }, []);

  useEffect(() => {
    socket;

    // function cleanup() {
    //   socket.disconnect();
    // }
    // return cleanup;
    socket.on("new-remote-operations", (seats: string) => {
      // console.log(JSON.parse(seats));

      // setRecievedSeats((recievedSeats) => [...recievedSeats, seats]);
      arrRec.push(...recievedSeats, seats);
      setRecievedSeats(arrRec);
      // setSelectedSeats(arrRec);
    });
  }, []);
  console.log(recievedSeats);
  // console.log(arrRec);
  // useEffect(() => {
  //   console.log(recievedSeats);
  // }, [recievedSeats]);

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
                key={seatId}
                onClick={
                  () => {
                    socket.emit("new-operations", seat.seat_num);
                  } //send data
                  // setSelectedSeats((addedSeats) => [
                  //   ...addedSeats,
                  //   seat.seat_num,
                  // ])
                }>
                {seat.isBooked ? (
                  <input type="checkbox" disabled />
                ) : (
                  <input type="checkbox" />
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
