var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola', function (req, res) {
    res.status(200).send('hola mundo desde una ruta');
});

var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io y NodeJs de Francisco Aravena',
    nickname: 'Bot - Fharavena'
}];

io.on('connection', function (socket) {
    console.log('El nodo con IP: '+socket.handshake.address+' se ha conectado...');

    socket.emit('messages', messages);

    socket.on('add-message', function(data){
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

server.listen(6677, function () {
    console.log('El servidor esta funcionando en http://localhost:6677');
});