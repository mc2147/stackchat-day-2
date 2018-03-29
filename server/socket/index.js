const Message = require('../db/models/message');
const Channel = require('../db/models/channel');

module.exports = io => {

  io.on('connection', socket => {

    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('new-message', message => {
      socket.broadcast.emit('new-message', message);// what prevents this from being emitted to the original client who sent the new-message
    });

    socket.on('new-channel', channel => {
      socket.broadcast.emit('new-channel', channel);
    });

  });

};
