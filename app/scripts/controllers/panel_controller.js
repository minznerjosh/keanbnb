(function(App) {
  'use strict';

  App.PanelController = Ember.ObjectController.extend({
    // Properties
    pendingRequests: Ember.computed.filterBy('model.requests', 'status', 'pending'),

    approvedRequests: Ember.computed.filterBy('model.requests', 'status', 'approved'),

    friendActivity: Ember.computed.or('model.pendingFriends.length', 'model.friends.length'),

    // Methods
    getRecordsWithStatus: function(recordsName, status) {
      var records = this.get('model.' + recordsName),
        filteredRecords = [];

      records.forEach(function(record) {
        if (record.get('status') === status) {
          filteredRecords.push(record);
        }
      });

      return filteredRecords;
    }
  });
})(window.App);
