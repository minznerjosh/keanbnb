(function(App) {
  'use strict';

  App.User = DS.Model.extend({
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
    password: DS.attr('string')
  });
})(window.App);
