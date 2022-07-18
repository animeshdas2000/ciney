const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server, {
//   cors: {
//     origin: "*", //allowing cors from anywhere
//   },
// });
const io = require("socket.io")(server, {
  cors: {
    origin: "*", //allowing cors from anywhere
  },
});

app.get("/", (req, res) => {
  res.send("Websocket Server");
});

server.listen(5000, () => {
  console.log("listening on port 5000");
});

const roomToReservation = {}; //room => Set [{room, seatId, state}]
const clientIdToReservation = {}; //clientId => Set [{room, seatId, state}]

function clearClientReservation(socket) {
  if (clientIdToReservation[socket.id] === undefined) return;
  for (const params of clientIdToReservation[socket.id].values()) {
    if (roomToReservation[params.room] !== undefined)
      roomToReservation[params.room].delete(params);
    socket.to(params.room).emit("temp-book-seat", { ...params, state: false });
  }
  delete clientIdToReservation[socket.id];
}

io.on("connection", (socket) => {
  // console.log("What socket", socket);
  console.log(`User Connected: ${socket.id}`);
  socket.on("join_movie_queue", (room) => {
    console.log(`${socket.id} joined ${room}`);
    socket.join(room);
    if (roomToReservation[room] === undefined) return;
    for (const seat of roomToReservation[room].values()) {
      socket.emit("temp-book-seat", seat);
    }
  });
  socket.on("temp-book-seat", (params) => {
    if (params.state) {
      (roomToReservation[params.room] =
        roomToReservation[params.room] || new Set()).add(params);
      (clientIdToReservation[socket.id] =
        clientIdToReservation[socket.id] || new Set()).add(params);
    } else {
      if (roomToReservation[params.room] !== undefined)
        roomToReservation[params.room].delete(params);
      if (clientIdToReservation[socket.id !== undefined])
        clientIdToReservation[socket.id].delete(params);
    }
    socket.to(params.room).emit("temp-book-seat", params);
    console.log(JSON.stringify(params));
    // console.log(roomToReservation, "Room");
    // console.log(clientIdToReservation, "ClientID");
  });
  // socket.on("send_blocked_seats", (data) => {
  //   socket.to(data.room).emit("blocked_seats", data);
  // });

  socket.on("leave-room", (room) => {
    socket.leave(room);
    console.log("Left Room", socket);
    clearClientReservation(socket);
  });
  socket.on("disconnect", () => {
    console.log(`User Disconnected : ${socket.id}`);
    clearClientReservation(socket);
  });
});
