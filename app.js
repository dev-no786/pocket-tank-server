var app = require('express');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var Player = require('./scripts/player/player.js');


io.on('connection', function(socket){
    console.log("new socket connnected");
    var player = new Player.Player(socket);
    player.init(); 
});

server.listen(3000,"127.0.0.1", ()=>{
    console.log("localhost: 3000");
});