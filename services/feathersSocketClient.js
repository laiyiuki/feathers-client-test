const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
// const auth = require('@feathersjs/authentication-client');

// feathers socket client
const client = feathers();
const socket = io('http://localhost:3030');
client
  .configure(socketio(socket))
  .configure(
    feathers.authentication({
      storage: window.localStorage,
      cookie: 'feathers-jwt',
      storageKey: 'f-jwt',
    }),;

module.exports = client;
