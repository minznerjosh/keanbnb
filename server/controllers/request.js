var q = require('q');

module.exports = {
  find: function(db, id) {
    var deferred = q.defer(),
      Request = db.models.request;

    if (!id) {
      
    }

    return deferred.promise;
  }
};
