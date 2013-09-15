(function(App, io) {
  'use strict';
  App.SocketIOAdapter = DS.Store.extend({
    // Methods
    findAll: function(store, type, sinceToken) {
      var self = this;

      return new Ember.RSVP.Promise(function(resolve, reject) {
        self.socketWrapper.socket.emit('GET', { type: type.typeKey }, function(response) {
          if (response.err) { reject(response.err); } else {
            resolve(response.data[type.typeKey.pluralize()]);
          }
        });
      });
    },

    findMany: function(store, type, ids, owner) {
      console.log('Hello from find many');
    },

    find: function(store, type, id) {
      var self = this;

      return new Ember.RSVP.Promise(function(resolve, reject) {
        self.socketWrapper.socket.emit('GET', { type: type.typeKey, id: id }, function(response) {
          if (response.err) { reject(response.err); } else {
            resolve(response.data[type.typeKey]);
          }
        });
      });
    },

    createRecord: function(store, type, record) {
      var self = this;

      return new Ember.RSVP.Promise(function(resolve, reject) {
        self.socketWrapper.socket.emit('POST', { type: type.typeKey, data: record }, function(response) {
          if (response.err) { reject(response.err); } else {
            resolve(response.data);
          }
        });
      });
    }
  });

  App.Store = DS.Store.extend({
    adapter: 'socketIO'
  });

  App.inject('service', 'store', 'store:main');
})(window.App, window.io);
