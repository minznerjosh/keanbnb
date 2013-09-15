var q = require('q'),
  uuid = require('node-uuid'),
  clients = {};

module.exports = {
  logInClient: function(socket, email) {
    var self = this;

    clients[socket.id] = {
      socket: socket,
      email: email
    };

    socket.on('disconnect', function() {
      self.logOutClient(socket.id);
    });
  },

  authenticateUser: function(email, password, db, socket) {
    var deferred = q.defer(),
      user = db.models.user;

    user.find({ email: email, password: password }, 1, function(err, users) {
      var user = users && users[0];

      if (err) { deferred.reject(err); } else {
        if (users.length === 0) {
          deferred.reject({ err: 'user not found' });
        } else {
          user.save({ rememberToken: uuid.v1() }, function(err) {
            if (err) { deferred.reject({ err: 'failed to save user token' }); }

            deferred.resolve({ user: user, err: null });
          });
        }
      }
    });

    return deferred.promise;
  },

  restoreSession: function(token, db) {
    var deferred = q.defer(),
      user = db.models.user;

    user.find({ rememberToken: token }, 1, function(err, users) {
      if (err) { deferred.reject(err); } else {
        if (users.length === 0) {
          deferred.reject({ err: 'no user with that session' });
        } else {
          deferred.resolve({ user: users[0] });
        }
      }
    });

    return deferred.promise;
  },

  logOutClient: function(socketId) {
    delete clients[socketId];
  }
};
