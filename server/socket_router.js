module.exports = function(db, io) {
  var inflection  = require('inflection');

  io.sockets.on('connection', function(socket) {
    console.log('Got client connection!');
    socket.on('GET', function(data) {
      var type = data.type,
        controller = require('./controllers/' + type + '.js'),
        payload = {};

      controller.get(db, io).then(function(data) {
        payload[inflection.pluralize(type)] = data;

        socket.emit('response', payload);
      });
    });
  });
};
