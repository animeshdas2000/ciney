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

let room;
io.on("connection", (socket) => {
  // console.log("What socket", socket);
  console.log(`User Connected: ${socket.id}`);
  socket.on("join_movie_queue", (data) => {
    console.log(`${socket.id} joined ${data}`);
    socket.join(data);
    room = data;
    socket.on("new-operations", (data) => {
      io.to(room).emit("new-remote-operations", data);
      console.log(data);
    });
  });
  // socket.on("send_blocked_seats", (data) => {
  //   socket.to(data.room).emit("blocked_seats", data);
  // });

  socket.on("disconnect", () => {
    console.log(`User Disconnected : ${socket.id}`);
  });
});
