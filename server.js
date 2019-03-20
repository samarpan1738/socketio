const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use('/', express.static(path.join(__dirname, 'frontend')));

io.on('connection', (socket) => {
    console.log("new socket formed from " + socket.id)
    socket.emit('connected');

    //Msg Received

    socket.on('send_msg', (msg) => {
        //sends to all including sender
        //io.emit('received_msg', msg)
        //sends to all except sender
        socket.broadcast.emit('received_msg', msg)
    })
})

server.listen(1738, () => {
    console.log("Server started at http://localhost:1738");
})