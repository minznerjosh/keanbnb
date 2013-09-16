var q = require('q');

module.exports = {
  create: function(db, data) {
    var deferred = q.defer(),
      FriendRequest = db.models.friendRequest;

    data.requester_id = data.requester;
    data.requestee_id = data.requestee;

    FriendRequest.create([data], function(err, friendRequests) {
      if (err) { deferred.reject(err); } else {
        deferred.resolve(friendRequests[0]);
      }
    });

    return deferred.promise;
  }
};
