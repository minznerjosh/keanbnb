(function(App) {
  'use strict';

  var attr = Ember.attr,
    hasMany = Ember.hasMany;

  App.Building = Ember.Model.extend({
    name: attr(),
    students: hasMany('App.User', { key: 'students' })
  });
})(window.App);
