var q = require('q');

module.exports = {
  findAll: function(db) {
    var model = db.models.building,
      deferred = q.defer();

    model.all(function(err, data) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(data);
      }
    });

    return deferred.promise;
  }
};
