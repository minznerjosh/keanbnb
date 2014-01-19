(function(App) {
  App.AuthenticationService = Ember.Object.extend({
    // Properties
    socketBinding: 'App.socket',
    currentUser: null,
    localStorage: window.localStorage,
    rememberToken: function(key, value) {
      if (arguments.length === 1) {
        return this.localStorage.rememberToken;
      } else {
        this.localStorage.rememberToken = value;
      }
    }.property(),

    // Methods
    init: function() {
      if (this.get('rememberToken')) { this.restoreSession(); }
    },

    restoreSession: function() {
      var self = this;

      return new Ember.RSVP.Promise(function(resolve, reject) {
        var token = self.get('rememberToken');

        if (!token) { reject('this browser is not linked to a user'); }

        self.get('socket').emit('RESTORE', { rememberToken: token }, function(response) {
          if (response.err) { reject(response.err); } else {
            App.User.find(response.userId).then(function(user) {
              self.set('currentUser', user);
              resolve(user);
            }, function(err) { reject(err); });
          }
        });
      });
    },

    login: function(email, password) {
      var self = this,
        socket = this.get('socket');

      return new Ember.RSVP.Promise(function(resolve, reject) {
        socket.emit('LOGIN', { email: email, password: password }, function(response) {
          if (response.err) { reject(response.err); } else {
            /*App.User.fetch(response.userId).then(function(user) {
              self.set('rememberToken', response.rememberToken);
              self.set('currentUser', user);
              resolve(user);
            }, function(err) { reject(err); });*/
            App.User.fetch(1).then(function(user) {
              console.log(user.get('firstName'));
            });
          }
        });
      });
    }
  });

  App.register('service:authentication', App.AuthenticationService);
  App.inject('controller', 'auth', 'service:authentication');
  App.inject('route', 'auth', 'service:authentication');
})(window.App);
