const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const auth = require('@feathersjs/authentication-client');
// const HOST = 'https://quiet-garden-63699.herokuapp.com';
const HOST = 'http://localhost:3030';

// feathers socket client
const client = feathers();
const socket = io(HOST);

client.configure(socketio(socket));
client.configure(
  auth({
    storage: window.localStorage,
    // cookie: 'learnla',
    storageKey: 'learnla',
  }),
);

module.exports = client;
