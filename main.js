var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var aurora = require("./aurora/aurora.js");
var cors = require('cors');

app.use(cors());


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/console', function(req, res){
  res.sendFile(__dirname + '/console/index.html');
});

app.route('/answer/:msg')
  .get(function(req, res, msg) {
    aurora.talk(req.params.msg).then((rsp)=>{res.send(rsp);});
  });

app.route('/json/:msg')
  .get(function(req, res, msg) {
    aurora.json(req.params.msg).then((rsp)=>{res.send(rsp);});
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
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});
