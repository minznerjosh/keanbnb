(function(App) {
  App.ApplicationController = Ember.Controller.extend({
    loggedInUserBinding: 'auth.currentUser'
  });
})(window.App);
