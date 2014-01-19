(function(App) {
  'use strict';

  var attr = Ember.attr,
    hasMany = Ember.hasMany,
    belongsTo = Ember.belongsTo;

  App.User = Ember.Model.extend({
    // Properties
    firstName: attr(),
    mi: attr(),
    lastName: attr(),
    street1: attr(),
    street2: attr(),
    city: attr(),
    state: attr(),
    zip: attr(),
    homePhone: attr(),
    cellPhone: attr(),
    isResident: attr(),
    studentId: attr(),
    building: belongsTo('App.Building', { key: 'building' }),
    room: attr(),
    email: attr(),
    password: attr(),
    requests: hasMany('App.Request', { key: 'requests' }),
    sentFriendRequests: hasMany('App.FriendRequest', { key: 'sentFriendRequests' }),
    receivedFriendRequests: hasMany('App.FriendRequest', { key: 'receivedFriendRequests' }),
    friends: function() {
      return this.getFriendsIfAccepted(true);
    }.property('sentFriendRequests.@each.requestee', 'sentFriendRequests.@each.accepted', 'receivedFriendRequests.@each.requester', 'receivedFriendRequests.@each.accepted'),

    // Methods
    getFriendsIfAccepted: function(bool) {
      var sentFriendRequests = this.get('sentFriendRequests'),
        receivedFriendRequests = this.get('receivedFriendRequests'),
        friends = [];

      sentFriendRequests.forEach(function(friendRequest) {
        if (friendRequest.get('accepted') === bool) {
          friends.pushObject(friendRequest.get('requestee'));
        }
      });

      receivedFriendRequests.forEach(function(friendRequest) {
        if (friendRequest.get('accepted') === bool) {
          friends.push(friendRequest.get('requester'));
        }
      });

      return friends;
    }
  });
})(window.App);
