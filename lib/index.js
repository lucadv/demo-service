const handler = function (request, reply) {
  reply({ message: 'hello world' });
};

const helloEndpoint = {
  description: 'Endpoint to provide a nice hello world message',
  auth: false,
  handler
};

exports.register = function (server, options, next) {
  const pub = server.select('public');
  //add endpoints here
  pub.route({ method: 'GET', path: '/hello', config: helloEndpoint });
  next();
};

exports.register.attributes = {
  pkg: require('../package.json')
};
