(function(App) {
  'use strict';

  App.FriendRequest = DS.Model.extend({
    accepted: DS.attr('boolean'),
    requester: DS.belongsTo('user', { async: true, inverse: 'sentFriendRequests' }),
    requestee: DS.belongsTo('user', { async: true, inverse: 'receivedFriendRequests' })
  });
})(window.App);
