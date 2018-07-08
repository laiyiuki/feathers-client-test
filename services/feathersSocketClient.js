const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');

// feathers socket client
const client = feathers();
const socket = io('http://localhost:3030');
client.configure(socketio(socket));

module.exports = client;
