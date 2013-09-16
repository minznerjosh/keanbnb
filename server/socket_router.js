module.exports = function(db, io) {
  var inflection  = require('inflection'),
    auth = require('./auth_handler.js');

  io.sockets.on('connection', function(socket) {
    console.log('Got client connection! ID: ' + socket.id);

    socket.on('GET', function(data, cb) {
      var type = data.type,
        id = data.id,
        query = data.query,
        controller = require('./controllers/' + type + '.js'),
        payload = {};

      if (id) {
        controller.find(db, id).then(function(data) {
          payload[type] = data;

          cb({ err: null, data: payload });
        }, function(err) { cb({ err: err }); });
      } else if (query) {
        controller.findQuery(db, query).then(function(data) {
          payload[inflection.pluralize(type)] = data;

          cb({ err: null, data: payload });
        }, function(err) { cb({ err: err}); });
      } else {
        controller.findAll(db, id).then(function(data) {
          payload[inflection.pluralize(type)] = data;

          cb({ err: null, data: payload });
        }, function(err) { cb({ err: err }); });
      }
    });

    socket.on('POST', function(data, cb) {
      var type = data.type,
        controller = require('./controllers/' + type + '.js'),
        payload = {};

      controller.create(db, data.data).then(function(data) {
        payload[type] = data;

        cb({ err: null, data: payload });
      }, function(err) { cb({ err: err }); });
    });

    socket.on('LOGIN', function(data, cb) {
      var sendSuccess = function(response) {
        cb({ err: null, userId: response.user.id, rememberToken: response.user.rememberToken });
      },
        sendFailure = function(response) {
          cb({ err: response.err });
        };

      auth.authenticateUser(data.email, data.password, db, socket).then(sendSuccess, sendFailure);
    });

    socket.on('RESTORE', function(data, respond) {
      auth.restoreSession(data.rememberToken, db).then(function(response) {
        respond({ userId: response.user.id });
      }, function(response) {
        respond({ err: response.err });
      });
    });
  });
};
