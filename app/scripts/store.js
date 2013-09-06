(function(App, io) {
  'use strict';
  App.SocketIOAdapter = DS.Store.extend({
    // Properties
    socket: io.connect('http://localhost:9000'),
    pendingPromises: {},

    // Methods
    init: function() {
      this.listenForResponse();
      this._super.call(this, arguments);
    },
    listenForResponse: function() {
      var self = this;

      this.socket.on('response', function(data) {
        var keys = Object.keys(data),
          unresolvedPromise = self.pendingPromises[keys[0]];

          if (unresolvedPromise) {
            unresolvedPromise.resolve(data[keys[0]]);
          }
      });
    },
    findAll: function(store, type, sinceToken) {
      var self = this,
        RSVP = Ember.RSVP,
        typeKey = type.typeKey;

      this.socket.emit('GET', { type: typeKey });

      return new RSVP.Promise(function(resolve, reject) {
        self.pendingPromises[typeKey.pluralize()] = {
          resolve: resolve,
          reject: reject
        };
      });
    },
    createRecord: function(store, type, record) {
      console.log(type);
    }
  });

  App.Store = DS.Store.extend({
    adapter: 'socketIO'
  });
})(window.App, window.io);
