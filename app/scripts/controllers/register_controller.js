(function(App) {
  'use strict';

  App.RegisterController = Ember.ObjectController.extend({
    // Methods
    actions: {
      submitRegistration: function() {
        this.get('model').save();
      }
    },

    // Properties
    buildings: function() {
      return this.store.find('building');
    }.property().cacheable(false),

    nameIsValid: function() {
      var firstName = this.get('model.firstName'),
        lastName = this.get('model.lastName');

      return !!(firstName && lastName);
    }.property('model.firstName', 'model.lastName'),

    addressIsValid: function() {
      var street1 = this.get('model.street1'),
        city = this.get('model.city'),
        state = this.get('model.state'),
        zip = this.get('model.zip');

      return !!(street1 && city && state && zip);
    }.property('model.street1', 'model.city', 'model.state', 'model.zip'),

    phoneIsValid: function() {
      var cell = this.get('model.cellPhone'),
        home = this.get('model.homePhone');

      return !!(cell || home);
    }.property('model.cellPhone', 'model.homePhone'),

    studentIdIsValid: function() {
      var id = this.get('model.studentId') || '';

      return !!(id.match(/^[0-9]*$/));
    }.property('model.studentId'),

    roomIsValid: function() {
      var room = this.get('model.room') || '';

      return !!(room.match(/^[1-9][0-9]{2}[A-Ba-b]$/));
    }.property('model.room'),

    emailIsValid: function() {
      var email = this.get('model.email') || '',
        isResident = this.get('model.isResident');

      return !!(isResident ?
        (email.split('@')[1] === 'kean.edu') :
        email);
    }.property('model.email', 'model.isResident'),

    passwordIsValid: function() {
      var password = this.get('model.password');

      return password && password.length > 7;
    }.property('model.password'),

    isValid: function() {
      var validations = this.getProperties('nameIsValid', 'addressIsValid', 'phoneIsValid', 'studentIdIsValid', 'roomIsValid', 'emailIsValid', 'passwordIsValid'),
        standardValidationsPass = validations.nameIsValid && validations.addressIsValid && validations.phoneIsValid && validations.emailIsValid && validations.passwordIsValid,
        residentValidationsPass = validations.studentIdIsValid && validations.roomIsValid,
        isResident = this.get('model.isResident');

      return isResident ? (standardValidationsPass && residentValidationsPass) : (standardValidationsPass);
    }.property('nameIsValid', 'addressIsValid', 'phoneIsValid', 'studentIdIsValid', 'roomIsValid', 'emailIsValid', 'passwordIsValid', 'model.isResident'),

    isInvalid: Ember.computed.not('isValid')
  });
})(window.App);
