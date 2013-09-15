window.App.Router.reopen({
  location: 'history'
});

window.App.Router.map(function () {
  this.route('register');
  this.resource('panel', function() {
    this.route('request');
    this.route('addFriend', { path: 'addfriend' });
  });
});
