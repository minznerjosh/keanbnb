(function(App) {
  App.IndexController = Ember.Controller.extend({
    // Properties
    showLoginForm: false,
    needs: ['application'],

    actions: {
      login: function(form) {
        var self = this,
          handleSuccess = function(user) {
            self.transitionToRoute('panel');
          };

        this.auth.login(form.email, form.password).then(handleSuccess);
      }
    }
  });
})(window.App);
