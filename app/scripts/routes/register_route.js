(function(App) {
  'use strict';

  App.RegisterRoute = Ember.Route.extend({
    model: function() {
      return this.store.createRecord('user');
    }
  });
})(window.App);
