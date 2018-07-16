import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const { paramsForServer } = require('feathers-hooks-common');
const { UserService } = require('./services');
const axios = require('axios');

// const HOST = 'https://quiet-garden-63699.herokuapp.com';
const HOST = 'http://localhost:3030';

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
      },
      paramsForServer({ action: 'phone-sign-up', platform: 'teacher' }),
    );

    const signedIn = await feathersClient.authenticate({
      strategy: 'local',
      phone: user.phone,
      password,
      platform: 'teacher',
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
const bgLogin = async () => {
  try {
    const res = await feathersClient.authenticate({
      // strategy: 'jwt',
      // accessToken: window.localStorage.learnla,
      // platform: 'teacher',
      strategy: 'local',
      phone: '85296344909',
      password: '1234',
      platform: 'admin',
    });
    // const res = await feathersClient.authenticate();

    // const res = await feathersClient.authenticate({ action: 'test' });
    console.log('authentication:', res);
  } catch (err) {
    console.log('Not authenticate', err);
  }
};
//

const pwdLogin = async (phone, password) => {
  try {
    const res = await feathersClient.authenticate(
      {
        strategy: 'local',
        phone,
        password,
        platform: 'teacher',
      },
      // paramsForServer({
      //   query: { abc: 1 },
      //   action: 'teacher-login',
      // }),
    );

    console.log('User created: ', res);
  } catch (err) {
    console.log('not authenticate', err);
  }
};

// const timeslots = [
//   {
//     days: [1, 2],
//     startTime: '09:00',
//   },
// ];
//
//
// bgLogin();
// pwdLogin('85296344901', '1234');
// isNewUser('96344902', '852');
// verifyPhone('96344902', '852', '6098');
createUser('96344903', '852', 'Paul', '1234');

// updateUser('5b4c799d9fe23f8e70eabe8d', {
//   birthday: new Date(),
//   name: 'Peter',
// });
// ///
//
//
//

class App extends Component {
  // async componentDidMount() {}

  logout = () => {
    feathersClient.logout();
  };

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
        <button
          onClick={() => this.logout()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          LOG OUT
        </button>
      </div>
    );
  }
}

export default App;
