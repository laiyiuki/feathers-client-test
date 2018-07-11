import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const { paramsForServer } = require('feathers-hooks-common');
const { UserService } = require('./services');
const axios = require('axios');

const HOST = 'https://quiet-garden-63699.herokuapp.com';

const feathersClient = require('./services/feathersSocketClient');
//
//
//
// auth on start
//
//

const login = async (phone, password) => {
  try {
    const res = await feathersClient.authenticate({
      strategy: 'local',
      phone,
      password,
    });
    console.log('login res', res);
  } catch (err) {
    console.log(err);
  }
};

const isNewUser = async (phoneNumber, countryCode) => {
  // Sign up - step 1 check for unique phone num
  // if true: twillio will send you sms with code
  try {
    const user = await UserService.find(
      paramsForServer({
        query: {
          phoneNumber,
          countryCode,
        },
        action: 'phone-sign-up',
      }),
    );

    // Return Object
    // @Return - { total: 0, limit: 10, skip: 0, data: [] }
    if (user.total > 0) {
      console.log('user already exists', user.data);
    } else {
      console.log('This is a new user');
    }
  } catch (err) {
    console.log('err', err);
  }
};

//

const verifyPhone = async (phoneNumber, countryCode, verifyCode) => {
  try {
    const res = await axios.post(`${HOST}/verify-phone`, {
      phoneNumber,
      countryCode,
      verifyCode,
    });
    console.log('verify response', res.data);
  } catch (err) {
    console.log(err);
  }
};

//

const createUser = async (phoneNumber, countryCode, name, password) => {
  try {
    const user = await UserService.create(
      {
        phoneNumber,
        countryCode,
        name,
        password,
        roles: ['teacher'],
      },
      paramsForServer({ action: 'phone-sign-up' }),
    );

    const signedIn = await feathersClient.authenticate({
      strategy: 'local',
      phone: user.phone,
      password,
    });

    console.log('User created: ', user);
    console.log('signed In', signedIn);
  } catch (err) {
    console.log('err', err);
  }
};

//

const updateUser = async (userId, data) => {
  try {
    // Call once when the app launch
    await feathersClient.authenticate();

    const user = await UserService.patch(userId, { ...data });
    console.log('user updated: ', user);
  } catch (err) {
    console.log('err', err);
  }
};
//
//
//
//

//
//
// isNewUser('96344902', '852');
// verifyPhone('96344902', '852', '6098');
createUser('9634402', '852', 'Thomas', '1234');

// updateUser('5b447546eea2b6557b4bcc50', {
//   birthday: new Date(),
//   name: 'John',
// });
// ///
//
//
//

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
