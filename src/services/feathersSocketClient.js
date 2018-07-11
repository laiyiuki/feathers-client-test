const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const auth = require('@feathersjs/authentication-client');

// feathers socket client
const client = feathers();
const socket = io('https://quiet-garden-63699.herokuapp.com');
client.configure(socketio(socket));
client.configure(
  auth({
    // header: 'Authorization', // the default authorization header for REST
    // prefix: '', // if set will add a prefix to the header value. for example if prefix was 'JWT' then the header would be 'Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOi...'
    // path: '/authentication', // the server-side authentication service path
    // jwtStrategy: 'jwt', // the name of the JWT authentication strategy
    // entity: 'user', // the entity you are authenticating (ie. a users)
    // service: 'users', // the service to look up the entity
    storage: window.localStorage,
    cookie: 'learnla',
    storageKey: 'learnla',
  }),
);

module.exports = client;
