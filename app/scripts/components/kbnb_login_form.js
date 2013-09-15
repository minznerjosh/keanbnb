(function(App) {
  App.KbnbLoginFormComponent = Ember.Component.extend({
    // Properties
    values: {
      email: null,
      password: null
    },

    // Methods
    didInsertElement: function() {
      Ember.run.scheduleOnce('afterRender', this, function() {
        var showForm = this.get('showForm'),
          $this = this.$(),
          $inputs = $this.find('#inputs');


        if (!showForm) { $inputs.hide(); }
      });
    },

    animate: function() {
      var showForm = this.get('showForm'),
        $this = this.$(),
        $inputs = $this.find('#inputs'),
        $buttons = $this.find('#buttons'),
        inputsWidth;

      if (showForm) {
        $inputs.css({
          position: 'absolute',
          display: 'inline-block',
          opacity: 0
        });

        inputsWidth = $inputs.outerWidth(true);

        $buttons.css('position', 'relative');
        $buttons.animate({
          left: inputsWidth
        }, function() {
          $buttons.css({
            position: 'static',
            left: 'auto'
          });
        });

        $inputs.css({
          width: 0,
          'white-space': 'nowrap',
          overflow: 'hidden'
        });
        $inputs.animate({
          width: inputsWidth,
          opacity: 1
        }, function() {
          $inputs.css({
            position: 'static',
            'white-space': 'normal',
            'overflow': 'visible',
            width: 'auto'
          });
        });
      } else {

      }
    }.observes('showForm'),

    actions: {
      loginClick: function() {
        var showForm = this.get('showForm');

        if (!showForm) {
          this.set('showForm', true);
        } else {
          this.sendAction('loginSubmit', { email: this.values.email, password: this.values.password });
        }
      }
    }
  });
})(window.App);
