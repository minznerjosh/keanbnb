(function(App) {
  'use strict';

  var attr = Ember.attr,
    belongsTo = Ember.belongsTo;

  App.Request = Ember.Model.extend({
    status: attr(),
    startDate: attr(Date),
    endDate: attr(Date),
    resident: belongsTo('App.User'),
    guest: belongsTo('App.User')
  });
})(window.App);
