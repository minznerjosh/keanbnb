module.exports = function(db) {
  var Request = db.define('request', {
    status: String,
    startDate: Date,
    endDate: Date
  });

  // Relationships
  //Request.hasOne('resident', (db.models.user || require('./user.js')(db)), { reverse: 'requests' });
  Request.hasOne('guest', (db.models.user || require('./user.js')(db)), { reverse: 'requests' });
};
