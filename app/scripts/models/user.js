(function(App) {
  'use strict';

  App.User = DS.Model.extend({
    // Properties
    firstName: DS.attr('string'),
    mi: DS.attr('string'),
    lastName: DS.attr('string'),
    street1: DS.attr('string'),
    street2: DS.attr('string'),
    city: DS.attr('string'),
    state: DS.attr('string'),
    zip: DS.attr('string'),
    homePhone: DS.attr('string'),
    cellPhone: DS.attr('string'),
    isResident: DS.attr('boolean'),
    studentId: DS.attr('string'),
    building: DS.belongsTo('building'),
    room: DS.attr('string'),
    email: DS.attr('string'),
    password: DS.attr('string'),
    requests: DS.hasMany('request'),
    sentFriendRequests: DS.hasMany('friendRequest', { async: true, inverse: 'requester' }),
    receivedFriendRequests: DS.hasMany('friendRequest', { async: true, inverse: 'requestee' }),
    friends: function() {
      return this.getFriendsIfAccepted(true);
    }.property('sentFriendRequests.@each.requestee', 'sentFriendRequests.@each.accepted', 'receivedFriendRequests.@each.requester', 'receivedFriendRequests.@each.accepted'),
    pendingFriends: function() {
      return this.getFriendsIfAccepted(false);
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
