(function(App, io) {
  'use strict';
  var SocketIOAdapter = DS.Store.extend({
    // Properties
    socket: io.connect('http://localhost:9000'),
    pendingPromises: {},

    // Methods
    findAll: function(store, type, sinceToken) {
      this.socket.emit('GET', { type: type.typeKey });
    }
  });

  App.Store = DS.Store.extend({
    adapter: SocketIOAdapter.create()
  });
})(window.App, window.io);
