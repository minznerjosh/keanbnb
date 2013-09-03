var express = require('express'),
  environment = require('./server/environment.js'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  livereloadMiddleware = require('connect-livereload')({port: environment.livereloadPort}),
  path = require('path');

module.exports = {
  app: app,
  server: server,
  io: io
};

app.use(livereloadMiddleware);

app.use('/scripts', express.static('.tmp/scripts'));
app.use('/bower_components', express.static('./app/bower_components'));
app.use('/styles', express.static('./app/styles'));

app.get('*', function(req, res) {
  res.sendfile('app/index.html');
});

server.listen(environment.port);
