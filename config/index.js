/**
 *
 * Contains configuration info for the hapi server and for the mongodb connection
 */
var options = {
  connections: [
    {
      port: process.env.PORT || 8080,
      labels: ['public']
    }
  ],
  plugins: [
    {
      name: './' // this tells hapi to register everything as a plugin
    }
  ]
};

exports = module.exports = options;
