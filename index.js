var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    if(io.sockets.adapter.sids[socket.id]['room1'])
    {
      socket.to('room1').emit('chat message', "Guess: "+msg);
    }
    if(io.sockets.adapter.sids[socket.id]['room2'])
    {
      socket.to('room2').emit('chat message', "Guess: "+msg);
    }
    if(io.sockets.adapter.sids[socket.id]['room2'])
    {
      socket.to('room3').emit('chat message', "Guess: "+msg);
    }
    socket.emit('chat message', "Mefeswfsdfdsfe: " + msg);
  });
  socket.on('ch1', function(msg){
    if(io.sockets.adapter.sids[socket.id]['room2'])
    {
      socket.leave('room2');
    }
    if(io.sockets.adapter.sids[socket.id]['room3'])
    {
      socket.leave('room3');
    }
    socket.join('room1');
  });
  socket.on('ch2', function(msg){
    if(io.sockets.adapter.sids[socket.id]['room1'])
    {
      socket.leave('room1');
    }
    if(io.sockets.adapter.sids[socket.id]['room3'])
    {
      socket.leave('room3');
    }
    socket.join('room2');
  });
  socket.on('ch3', function(msg){

  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});