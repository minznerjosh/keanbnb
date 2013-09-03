(function(App) {
  'use strict';

  App.RegisterController = Ember.ObjectController.extend({
    // Methods

    // Properties
    buildings: function() {
      return this.store.find('building');
    }.property().cacheable(false)
  });
})(window.App);
