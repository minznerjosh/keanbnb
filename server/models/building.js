module.exports = function(db) {
  var Building = db.define('building', {
    name: String
  });

  return Building;
};
