(function(App) {
  'use strict';

  App.PanelAddFriendRoute = Ember.Route.extend({
    model: function() {
      return this.store.createRecord('friendRequest');
    }
  });
})(window.App);
