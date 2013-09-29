(function(App) {
  'use strict';

  App.PanelController = Ember.ObjectController.extend({
    // Properties
    pendingRequests: Ember.computed.filterBy('model.requests', 'status', 'pending'),

    approvedRequests: Ember.computed.filterBy('model.requests', 'status', 'approved'),

    friendActivity: Ember.computed.or('model.pendingFriends.length', 'model.friends.length'),

    // Methods
    actions: {
      approveFriend: function(request) {
        request.set('accepted', true);
        request.save().then(function(request) {
          console.log(request.get('requester'));
        });
      },

      unfriend: function(friend) {
        var receivedFriendRequests = this.get('model.receivedFriendRequests'),
          sentFriendRequests = this.get('model.sentFriendRequests'),
          foundRequest;

        receivedFriendRequests.forEach(function(request) {
          if (request.get('requester') === friend) {
            foundRequest = request;
          }
        });

        sentFriendRequests.forEach(function(request) {
          if (request.get('requestee') === friend) {
            foundRequest = request;
          }
        });

        foundRequest.deleteRecord();
        foundRequest.save();
      }
    }
  });
})(window.App);
