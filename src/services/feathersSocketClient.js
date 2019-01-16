const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const auth = require('@feathersjs/authentication-client');

const HOST = 'https://learnla-api.herokuapp.com/';
// const HOST = 'https://learnla-api-staging.herokuapp.com/';
// const HOST = 'http://localhost:3030';

// const HOST = 'https://learnla-api-dev.herokuapp.com';
// // const HOST = 'https://learnla-api-dev.herokuapp.com/';
// const HOST = 'https://api.learnla.app';
// feathers socket client
const client = feathers();
const socket = io(HOST);

client.configure(socketio(socket));
client.configure(
  auth({
    storage: window.localStorage,
    // cookie: 'learnla',c
    storageKey: 'learnla',
  })
);

module.exports = client;
