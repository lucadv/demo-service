/*eslint no-console: "off"*/
const Hapi = require('hapi');
const Hoek = require('hoek');
const Async = require('async');
const Config = require('./config');

const server = new Hapi.Server({});

//Adds incoming server connections
Config.connections.forEach(connectionOptions => {
  server.connection(connectionOptions);
});

Async.forEachSeries(Config.plugins, (plugin, next) => {
  server.register({ register: require(plugin.name), options: plugin.options }, next);
}, err => {
  Hoek.assert(!err, `Failed loading plugin : ${err}`);
  server.start(() => {
    console.log('All servers started');
  });
});

const gracefulShutdown = function (callback) {
  server.stop(() => {
    console.log('All servers stopped');
    return callback();
  });
};

process.once('SIGINT', () => {
  console.log('Received SIGINT');
  gracefulShutdown(() => {
    process.kill(process.pid, 'SIGINT');
  });
});

process.once('SIGUSR2', () => {
  console.log('Received SIGUSR2');
  gracefulShutdown(() => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
