module.exports = function(db, io) {
  io.sockets.on('connection', function(socket) {
    console.log('Got client connection!');
    socket.on('GET', function() {
      console.log('GET');
    });
  });
};
