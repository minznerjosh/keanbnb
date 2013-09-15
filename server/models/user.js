module.exports = function(db) {
  var User = db.define('user', {
    firstName: String,
    mi: String,
    lastName: String,
    street1: String,
    street2: String,
    city: String,
    state: String,
    zip: String,
    homePhone: String,
    cellPhone: String,
    isResident: Boolean,
    studentId: String,
    room: String,
    email: String,
    password: String,
    rememberToken: String
  });

  // Relationships
  User.hasMany('friends', User);
  User.hasMany('pendingFriends', User);
  User.hasOne('building', (db.models.building || require('./building.js')(db)), { reverse: 'students' });

  return User;
};
