(function(App) {
  'use strict';

  App.Store = DS.Store.extend({
    adapter: DS.Adapter.extend({
      findAll: function(store, type, sinceToken) {

      }
    })
  });
})(window.App);
