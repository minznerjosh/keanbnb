(function(App) {
  'use strict';

  function getTypeKey(record) {
    var constructorName = record.constructor.toString(),
      constructorNameArray = constructorName.split('.'),
      typeKey;

    constructorNameArray.splice(0, 1);

    typeKey = constructorNameArray.join();

    return typeKey.camelize();
  }

  var Adapter = Ember.Object.extend({
    socketBinding: 'App.socket',

    // Methods
    find: function(record, id) {
      var self = this,
        type = getTypeKey(record);

      return new Ember.RSVP.Promise(function(resolve, reject) {
        self.get('socket').emit('GET', { type: type, id: id }, function(response) {
          if (response.err) {
            reject(response.err);
          } else {
            record.load(resolve(response.data[type]));
          }
        });
      });
    }
  });

  Ember.Model.reopenClass({
    adapter: Adapter.create()
  });
})(window.App);
