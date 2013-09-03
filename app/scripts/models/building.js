(function(App) {
  'use strict';

  App.Building = DS.Model.extend({
    name: DS.attr('string'),
    students: DS.hasMany('user')
  });
})(window.App);
