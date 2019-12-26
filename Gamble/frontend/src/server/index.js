const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 8001;

app.get('/', function(req, res) {
  res.send('<h1>Hello worlds</h1>')
});

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('chat message send', (room) => {
    io.to(room.address).emit('chat message received', room.msg);
  });

  socket.on('game data send', (data) => {
    io.to(data.address).emit('game data received', data.data);
  });

  socket.on('set up game', (room, user) => {
    io.to(room).emit('set up game received', user);
  });

  socket.on('remove user from game', (room, user) => {
    io.to(room).emit('remove user from game received', user);
  });

  socket.on('joined room', (room) => {
    socket.join(room, (err) => {
      if(err) throw err;
      console.log(`a user joined room ${room}`);
    })
  });

  socket.on('left room', (room) => {
    socket.leave(room, (err) => {
      if(err) throw err;
      console.log(`a user left room ${room}`);
    })
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

http.listen(port, function() {
  console.log(`listening on ${port}`)
});
