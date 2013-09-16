(function(App) {
  'use strict';

  App.PanelAddFriendController = Ember.ObjectController.extend({
    // Properties
    friendEmail: null,

    actions: {
      sendRequest: function(email) {
        var self = this,
          request = this.get('model'),
          findUser = function() {
            return new Ember.RSVP.Promise(function(resolve, reject) {
              self.store.findQuery('user', { email: email })
                .then(function(users) {
                  var user = users.objectAt(0);

                  if (!user) {
                    self.store.createRecord('user', { email: email }).save()
                      .then(resolve, reject);
                  } else {
                    resolve(user);
                  }
                }, reject);
            });
          },
          sendRequest = function(user) {
            request.set('requester', self.auth.get('currentUser'));
            request.set('requestee', user);
            request.set('accepted', false);

            return request.save();
          },
          goBack = function() {
            self.transitionToRoute('panel');
          },
          handleError = function(error) {
            console.log(error);
          };

        findUser()
          .then(sendRequest)
          .then(goBack)
          .then(null, handleError);
      }
    }
  });
})(window.App);
