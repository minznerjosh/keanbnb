(function(App, io) {
  'use strict';
  App.SocketIOAdapter = DS.Store.extend({
    defaultSerializer: 'DS/REST',
    // Methods
    findAll: function(store, type, sinceToken) {
      var self = this;

      return new Ember.RSVP.Promise(function(resolve, reject) {
        self.socketWrapper.socket.emit('GET', { type: type.typeKey }, function(response) {
          if (response.err) { reject(response.err); } else {
            resolve(response.data);
          }
        });
      });
    },

    findMany: function(store, type, ids, owner) {
      var self = this;

      return new Ember.RSVP.Promise(function(resolve, reject) {
        self.socketWrapper.socket.emit('GET', { type: type.typeKey, ids: ids }, function(response) {
          if (response.err) { reject(response.err); } else {
            resolve(response.data);
          }
        });
      });
    },

    findQuery: function(store, type, query) {
      var self = this;

      return new Ember.RSVP.Promise(function(resolve, reject) {
        self.socketWrapper.socket.emit('GET', { type: type.typeKey, query: query }, function(response) {
          if (response.err) { reject(response.err); } else {
            resolve(response.data);
          }
        });
      });
    },

    find: function(store, type, id) {
      var self = this;

      return new Ember.RSVP.Promise(function(resolve, reject) {
        self.socketWrapper.socket.emit('GET', { type: type.typeKey, id: id }, function(response) {
          if (response.err) { reject(response.err); } else {
            resolve(response.data);
          }
        });
      });
    },

    updateRecord: function(store, type, record) {
      var self = this,
        data = {},
        serializer = store.serializerFor(type.typeKey);

      return new Ember.RSVP.Promise(function(resolve, reject) {
        self.socketWrapper.socket.emit('PUT', { type: type.typeKey, id: record.get('id'), data: serializer.serialize(record) }, function(response) {
          if (response.err) { reject(response.err); } else {
            resolve(response.data);
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
    },

    deleteRecord: function(store, type, record) {
      var self = this;

      return new Ember.RSVP.Promise(function(resolve, reject) {
        self.socketWrapper.socket.emit('DELETE', { type: type.typeKey, id: record.get('id') }, function(response) {
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
