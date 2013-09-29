var q = require('q'),
  serializer = require('../serializers/friendRequest.js');

module.exports = {
  create: function(db, data) {
    var FriendRequest = db.models.friendRequest,
      serializeResult = function(request) {
        return serializer.serialize(request);
      };

    return serializer.createModel(FriendRequest, data)
      .then(serializeResult);
  },

  update: function(db, id, data) {
    var getRequest = q.nbind(db.models.friendRequest.get, db.models.friendRequest),
      updateRequest = function(request) {
        return serializer.updateModel(request, data).save();
      },
      serializeRequest = function(request) {
        return serializer.serialize(request);
      };

    return getRequest(id)
      .then(updateRequest)
      .then(serializeRequest);
  },

  deleteRecord: function(db, id) {
    var getRequest = q.nbind(db.models.friendRequest.get, db.models.friendRequest),
      deleteRequest = function(request) {
        return q.npost(request, 'remove', []);
      };

    return getRequest(id)
      .then(deleteRequest);
  },

  findMany: function(db, ids) {
    var getRequests = q.nbind(db.models.friendRequest.get, db.models.friendRequest),
      normalizeData = function(requests) {
        if (!(requests instanceof Array)) {
          requests = [requests];
        }

        return serializer.serializeMany(requests);
      };

    return getRequests(ids)
      .then(normalizeData);
  }
};
