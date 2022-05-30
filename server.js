const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);

const socketio = require('socket.io');
const formatMessage = require('./util/messages');
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));


io.on("connection", socket => {

  socket.on('joinRoom', ({ username, room }) => {
    // when open chat
    socket.emit('message', formatMessage("ChatCord", "Welcome to ChatCord!"));

    // when join chat send your other user has joined
    socket.broadcast.emit('message', formatMessage(username, `${username} has joined`))


    socket.on('chatMessage', msg => {
      io.emit('message', formatMessage(username, msg))
    })


    // when disconnect chat send your other user has joined
    socket.on('disconnect', () =>
      io.emit('message', formatMessage('User', `${username} has disconnected`))
    );
  });




})







let PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log("Server listening on port :" + PORT));