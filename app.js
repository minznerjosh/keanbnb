var express = require('express'),
  environment = require('./server/environment.js'),
  app = express(),
  orm = require('orm'),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  livereloadMiddleware = require('connect-livereload')({port: environment.livereloadPort}),
  path = require('path');

module.exports = {
  app: app,
  orm: orm,
  server: server,
  io: io
};

app.use(livereloadMiddleware);

app.use(orm.express(environment.mysql, {
  define: function(db, models) {
    models.user = require('./server/models/user.js')(db);
    models.building = require('./server/models/building.js')(db);

    db.sync();

    models.building.exists({}, function(err, exists) {
      if (!exists) {
        models.building.create([
          {
            name: 'NURH'
          },
          {
            name: 'New Freshman RH'
          },
          {
            name: 'Whiteman Hall'
          },
          {
            name: 'Dougal Hall'
          },
          {
            name: 'Rogers Hall'
          },
          {
            name: 'Sozio Hall'
          },
          {
            name: 'Burch Hall'
          },
          {
            name: 'Bartlett Hall'
          }
        ]);
      }
    });

    require('./server/socket_router.js')(db, io);
  }
}));

app.use('/scripts', express.static('.tmp/scripts'));
app.use('/bower_components', express.static('./app/bower_components'));
app.use('/styles', express.static('./app/styles'));

app.get('*', function(req, res) {
  res.sendfile('app/index.html');
});

server.listen(environment.port);
