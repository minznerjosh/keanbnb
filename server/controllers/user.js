var q = require('q');

module.exports = {
  find: function(db, id) {
    var deferred = q.defer();

    db.models.user.get(id, function(err, user) {
      if (err) { deferred.reject(err); } else {
        delete user.password;

        user.request_ids = [];
        user.peningFriend_ids = [];

        user.getRequests(function(err, requests) {
          if (err) { deferred.reject(err); } else {
            requests.forEach(function(request) {
              user.request_ids.push(request.id);
            });
          }
        });

        user.getPendingFriends(function(err, pendingFriends) {
          if (err) { deferred.reject(err); } else {
            pendingFriends.forEach(function(pendingFriend) {
              user.pendingFriends_ids.push(pendingFriend.id);
            });
          }
        });

        deferred.resolve(user);
      }
    });

    return deferred.promise;
  },

  create: function(db, data) {
    var deferred = q.defer(),
      auth = require('../auth_handler.js'),
      model = db.models.user;

    model.create([data], function(err, response) {
      if (err) {
        deferred.reject(err);
      } else {
        delete response[0].password;

        deferred.resolve(response[0]);
      }
    });

    return deferred.promise;
  }
};

