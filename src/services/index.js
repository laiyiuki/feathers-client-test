const feathersSocketClient = require('./feathersSocketClient');

const UserService = feathersSocketClient.service('users');

module.exports = {
  UserService,
};
