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
    room: String
  });

  // Relationships
  User.hasOne('building', require('./building.js')(db), { reverse: 'students' });

  return User;
};
