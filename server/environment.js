module.exports = (function() {
  var mode = process.env.NODE_ENV || 'development',
    isDev = (mode === 'development');

  return {
    port: isDev ? 9000 : 80,
    livereloadPort: isDev ? 35729 : undefined,
    mysql: isDev ? 'mysql://dev:nodejs@localhost/keanbnb' : null
  };
})();
