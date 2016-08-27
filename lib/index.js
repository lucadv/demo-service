const Routes = require('./routes');

exports.register = function (server, options, next) {
  Routes.register(server, options, next);
};

exports.register.attributes = {
  pkg: require('../package.json')
};
