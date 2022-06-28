const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
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

io.on("connection", (socket) => {
  console.log("a user joined!!");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat", (message) => {
    io.emit("chat", message);
  });
});
