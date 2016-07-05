var Hapi = require('hapi');
var Hoek = require('hoek');
var Async = require('async');
var Config = require('./config');

var server = new Hapi.Server({});

Config.connections.forEach(function (connectionOptions) {
  server.connection(connectionOptions);
});

Async.forEachSeries(Config.plugins, function (plugin, next) {
  server.register({ register: require(plugin.name), options: plugin.options }, next);
}, function (err) {
  Hoek.assert(!err, 'Failed loading plugin : ' + err);
  server.start(function () {
    console.log('All servers started');
  });
});

var gracefulShutdown = function (callback) {
  server.stop(function () {
    console.log('All servers stopped');
    return callback();
  });
};

process.once('SIGINT', function () {
  console.log('Received SIGINT');
  gracefulShutdown(function () {
    process.kill(process.pid, 'SIGINT');
  });
});

process.once('SIGUSR2', function () {
  console.log('Received SIGUSR2');
  gracefulShutdown(function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});
