const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
let usersockets = {};
//Using middleware
app.use("/", express.static(path.join(__dirname, "frontend")));

io.on("connection", socket => {
  console.log("new socket formed from " + socket.id);
  socket.emit("connected");

  socket.on("login", username => {
    usersockets[username] = socket.id;
  });

  //Msg Received
  socket.on("send_msg", msg => {
    if (msg.message.startsWith("@")) {
      let tokens = msg.message.split(":");
      let recepient = tokens[0].substr(1);
      msg.message = tokens[1];
      io.to(usersockets[recepient]).emit("received_msg", msg);
    }
    //sends to all including sender
    else io.emit("received_msg", msg);
    //sends to all except sender
    //socket.broadcast.emit('received_msg', msg)
  });
});

server.listen(1738, () => {
  console.log("Server started at http://localhost:1738");
});
