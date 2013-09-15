(function(App) {
  'use strict';

  App.PanelRoute = Ember.Route.extend({
    beforeModel: function(transition) {
      if (!this.get('auth.currentUser')) {
        return this.auth.restoreSession();
      }
    },
    model: function() {
      return this.get('auth.currentUser');
    }
  });
})(window.App);
