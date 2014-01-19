var App = window.App = Ember.Application.create();

Ember.Application.initializer({
  name: 'socket',

  initialize: function(container, application) {
    application.set('socket', window.io.connect('http://localhost:9000'));
  }
});

/* Order and include as you please. */
require('scripts/services/*');
require('scripts/controllers/*');
require('scripts/adapter');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/components/*');
require('scripts/router');
