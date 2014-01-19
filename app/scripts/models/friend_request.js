(function(App) {
  'use strict';

  var attr = Ember.attr,
    belongsTo = Ember.belongsTo;

  App.FriendRequest = Ember.Model.extend({
    accepted: attr(),
    requester: belongsTo('App.User', { key: 'requester' }),
    requestee: belongsTo('App.User', { key: 'requestee' })
  });
})(window.App);
