const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('ping', (data) => {
    console.log("got a live websocket ping from one instance of", data.name);
    socket.emit("pong", { coffees: 26 });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('user message: ' + msg);
    io.emit('chat message', msg);
  });
});