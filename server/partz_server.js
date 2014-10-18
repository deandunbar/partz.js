var express = require("express");
var app = express();
var port = 8080;



app.use(express.static(__dirname + '/public'));

//~ //jade template with express engine
//~ app.get("/", function(req, res){
    //~ res.render("page");
//~ });


app.get("/", function(req, res){
    res.send("It works!");
});
 
//app.listen(port);
var io = require('socket.io').listen(app.listen(port));

//connection handler scoket.io
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});



app.use(express.static(__dirname + '/shared'));
console.log("Listening on port " + port);
