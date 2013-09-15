(function(App) {
  'use strict';

  App.Request = DS.Model.extend({
    status: DS.attr('string'),
    startDate: DS.attr('date'),
    endDate: DS.attr('date'),
    resident: DS.belongsTo('user'),
    guest: DS.belongsTo('user')
  });
})(window.App);
