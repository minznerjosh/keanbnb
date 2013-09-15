(function(App) {
  App.AuthenticationService = Ember.Object.extend({
    // Properties
    socket: null,
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
      this.set('socket', this.socketWrapper.socket);

      if (this.get('rememberToken')) { this.restoreSession(); }
    },

    restoreSession: function() {
      var self = this;

      return new Ember.RSVP.Promise(function(resolve, reject) {
        var token = self.get('rememberToken');

        if (!token) { reject('this browser is not linked to a user'); }

        self.socket.emit('RESTORE', { rememberToken: token }, function(response) {
          if (response.err) { reject(response.err); } else {
            self.store.find('user', response.userId).then(function(user) {
              self.set('currentUser', user);
              resolve(user);
            }, function(err) { reject(err); });
          }
        });
      });
    },

    login: function(email, password) {
      var self = this,
        socket = this.socket;

      return new Ember.RSVP.Promise(function(resolve, reject) {
        socket.emit('LOGIN', { email: email, password: password }, function(response) {
          if (response.err) { reject(response.err); } else {
            self.store.find('user', response.userId).then(function(user) {
              self.set('rememberToken', response.rememberToken);
              self.set('currentUser', user);
              resolve(user);
            }, function(err) { reject(err); });
          }
        });
      });
    }
  });

  App.register('service:authentication', App.AuthenticationService);
  App.inject('controller', 'auth', 'service:authentication');
  App.inject('route', 'auth', 'service:authentication');
})(window.App);
