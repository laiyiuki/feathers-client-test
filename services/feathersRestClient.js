const feathers = require('@feathersjs/feathers');
const rest = require('@feathersjs/rest-client');
const axios = require('axios');

// feathers rest client
const client = feathers();
const restClient = rest('http://localhost:3030');
client.configure(restClient.axios(axios));

module.exports = client;
