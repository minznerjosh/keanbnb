var q = require('q');

module.exports = {
  find: function(db, id) {
    var getId = function(model) {
        return model.id;
      },
      getUser = q.nbind(db.models.user.get, db.models.user),
      getRelationships = function(user) {
        return q.all([
          user,
          q.npost(user, 'getResidentRequests', []),
          q.npost(user, 'getGuestRequests', []),
          q.npost(user, 'getSentFriendRequests', []),
          q.npost(user, 'getReceivedFriendRequests', [])
        ]);
      },
      serializeUser = function(userAndRelationships) {
        var user = userAndRelationships[0],
          residentRequests = userAndRelationships[1],
          guestRequests = userAndRelationships[2],
          sentFriendRequests = userAndRelationships[3],
          receivedFriendRequests = userAndRelationships[4];

        user.residentRequests = residentRequests.map(getId);

        user.guestRequests = guestRequests.map(getId);

        user.sentFriendRequests = sentFriendRequests.map(getId);

        user.receivedFriendRequests = receivedFriendRequests.map(getId);

        return user;
      };

    return getUser(id)
      .then(getRelationships)
      .then(serializeUser);
  },

  findQuery: function(db, query) {
    var deferred = q.defer();

    db.models.user.find(query, 1, function(err, users) {
      if (err) { deferred.reject(err); } else {
        deferred.resolve(users);
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

