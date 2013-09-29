var q = require('q');

function capitalizeFirstChar(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function Relationship(type) {
  this.type = type;

  this.toString = function() {
    return '[Relationship ' + this.type + ']';
  };
}

function OrmModelSerializer(config) {
  var maps = {};

  function parseConfig(name, data) {
    var myMap = maps[name] = {};

    for (var property in data) {
      var typeConfig = data[property];

      if (typeof typeConfig === 'function') {
        myMap[property] = typeConfig;
      } else if (typeof typeConfig === 'object') {
        myMap[property] = typeConfig.type;
      }
    }
  }

  for (var type in config) {
    parseConfig(type, config[type]);
  }

  if (!maps.default) {
    throw new Error('You need to supply a default configuration!');
  }

  this.updateModel = function(model, data) {
    var map = maps.default;

    for (var property in data) {
      var value = data[property],
        MapConfig  = map[property];

      if (MapConfig === 'hasOne') {
        model[property + '_id'] = parseFloat(value);
      } else {
        model[property] = new MapConfig(value);
      }
    }

    return model;
  };

  this.createModel = function(type, data) {
    var hash = this.updateModel({}, data);

    return q.npost(type, 'create', [hash]);
  };

  this.serialize = function(model) {
    var deferred = q.defer(),
      result = {},
      map = maps.default,
      relationshipNames = [],
      relationshipPromises = [];

    for (var property in map) {
      var MapConfig = map[property];

      if (typeof MapConfig === 'function') {
        result[property] = new MapConfig(model[property]);
      } else if (MapConfig === 'hasOne') {
        var promise = q.npost(model, 'get' + capitalizeFirstChar(property), []);

        relationshipNames.push(property);
        relationshipPromises.push(promise);
      }
    }

    if (relationshipPromises.length > 0) {
      q.all(relationshipPromises).then(function(relationships) {
        relationships.forEach(function(relationship, index) {
          var property = relationshipNames[index];

          if (relationship instanceof Array) {

          } else {
            result[property] = relationship.id;
          }
        });

        deferred.resolve(result);
      }, deferred.reject);
    } else {
      deferred.resolve(result);
    }

    return deferred.promise;
  };

  this.serializeMany = function(models) {
    var self = this,
      promises = [];

    models.forEach(function(model) {
      promises.push(self.serialize(model));
    });

    return q.all(promises);
  };
}

OrmModelSerializer.hasOne = function() {
  return new Relationship('hasOne');
};

module.exports = OrmModelSerializer;
