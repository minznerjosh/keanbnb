(function(App) {
  'use strict';

  App.FriendRequest = DS.Model.extend({
    accepted: DS.attr('boolean'),
    requester: DS.belongsTo('user'),
    requestee: DS.belongsTo('user')
  });
})(window.App);
