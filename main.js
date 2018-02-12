var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var aurora = require("./aurora.js");

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
    aurora.talk(msg).then((rsp)=>{io.emit('chat message',rsp);});
    //console.log('aurora: ' + aurora.talk(msg));
    //io.emit(aurora.talk(msg));
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
