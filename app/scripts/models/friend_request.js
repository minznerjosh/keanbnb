(function(App) {
  'use strict';

  App.FriendRequest = DS.Model.extend({
    accepted: DS.attr('boolean'),
    requester: DS.belongsTo('user', { inverse: 'sentFriendRequests' }),
    requestee: DS.belongsTo('user', { inverse: 'receivedFriendRequests' })
  });
})(window.App);
