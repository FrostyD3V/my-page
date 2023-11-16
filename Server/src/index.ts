import express from "express";
import socketio from "socket.io";
import http from "http";

let app = express();
let server = http.createServer(app);
let io = new socketio.Server(server, {});

const port = Number.parseInt(process.env.PORT) || 3000;

app.use("/", express.static(__dirname + "/client"));

let SOCKET_LIST = {};

io.sockets.on("connect", (socket) => {
  console.log(`Client connected: ${socket.id}`);
  SOCKET_LIST[socket.id] = socket;

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    delete SOCKET_LIST[socket.id];
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
