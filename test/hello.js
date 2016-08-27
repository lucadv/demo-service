const Code = require('code');
const Lab = require('lab');
const Hapi = require('hapi');

// Lab shortcuts
const lab = exports.lab = Lab.script();
const before = lab.before;
const after = lab.after;
const describe = lab.describe;
const it = lab.it;

const expect = Code.expect;

let server;

before(done => {
  //creating the node server
  server = new Hapi.Server();
  server.connection({ labels: ['public'] });
  server.register({ register: require('../') }, err => {
    expect(err).to.not.exist();
    done();
  });
});

after(done => {
  server.stop(done);
});

describe('Hello Endpoint', () => {

  it('should respond with 200 ok and hello world', done => {

    server.inject({ method: 'GET', url: '/hello' }, res => {
      expect(res.statusCode).to.equal(200);
      expect(res.result.message).to.equal('hello world');
      done();
    });
  });
});
