const handler = function (request, reply) {
  reply({ message: 'hello world'
});
};

const helloEndpoint = {
  description: 'Endpoint to provide a nice hello world message',
  auth: false,
  handler
};

const register = function (server, options, next) {

  const pub = server.select('public');
  //add endpoints here
  pub.route({ method: 'GET', path: '/hello', config: helloEndpoint });

  next();
};

exports = module.exports = {
  register
};
