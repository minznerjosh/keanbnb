(function(App) {
  'use strict';

  App.RegisterController = Ember.ObjectController.extend({
    // Methods
    actions: {
      submitRegistration: function() {
        this.get('model').save();
      }
    },

    // Properties
    buildings: function() {
      return this.store.find('building');
    }.property().cacheable(false)
  });
})(window.App);
