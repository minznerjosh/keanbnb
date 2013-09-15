module.exports = function(db) {
  var FriendRequest = db.define('friendRequest', {
    accepted: Boolean
  });

  // Relationships
  FriendRequest.hasOne('requester', (db.models.user || require('./user.js')), { reverse: 'sentFriendRequests' });
  FriendRequest.hasOne('requestee', (db.models.user || require('./user.js')), { reverse: 'receivedFriendRequests' });
};
