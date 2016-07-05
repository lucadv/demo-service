var operations = {
  hello: {
    handler: function (request, reply) {
      reply('hello world');
    }
  }
};

var register = function (server, options, next) {

  var pub = server.select('public');
  //add endpoints here
  pub.route({ method: 'GET', path: '/hello', config: operations.hello});

  next();
};



exports = module.exports = {
  register: register
};
