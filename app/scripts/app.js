var App = window.App = Ember.Application.create();

App.SocketWrapper = Ember.Object.extend({
  // Properties
  socket: null,

  // Methods
  init: function() {
    this.set('socket', window.io.connect('http://localhost:9000'));
  }
});

App.register('socket:main', App.SocketWrapper);
App.inject('adapter:socketIO', 'socketWrapper', 'socket:main');
App.inject('service:authentication', 'socketWrapper', 'socket:main');

/* Order and include as you please. */
require('scripts/services/*');
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/components/*');
require('scripts/router');
