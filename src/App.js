import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  feathersClient,
  AuthByJWT,
  AuthByPassword,
  UserService,
  TeacherService,
  CourseAdService,
} from './services';
import { getTeacherProfile, modifyTeacherProfile } from './controllers';

const { paramsForServer } = require('feathers-hooks-common');
const axios = require('axios');

// const HOST = 'https://quiet-garden-63699.herokuapp.com';
const HOST = 'http://localhost:3030';

// const feathersClient = require('./services/feathersSocketClient');

// Handle Auto reauthenticate when socket re-connected
feathersClient.on('reauthentication-error', async err => {
  console.log('reauthentication-error', err);
  const reauthenticate = await feathersClient.authenticate({
    strategy: 'jwt',
    accessToken: window.localStorage.learnla,
    platform: 'teacher',
  });
  console.log('reauthenticated', reauthenticate);
});

const login = async (phone, password) => {
  try {
    const res = await feathersClient.authenticate({
      strategy: 'local',
      phone,
      password,
      platform: 'teacher',
    });
    console.log('login success', res);
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
// ****
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

// const updateUser = async (userId, data) => {
//   try {
//     // Call once when the app launch
//     await feathersClient.authenticate();
//
//     const user = await UserService.patch(userId, { ...data });
//     console.log('user updated: ', user);
//   } catch (err) {
//     console.log('err', err);
//   }
// };
//
//
// ***
const bgLogin = async () => {
  try {
    const res = await feathersClient.authenticate({
      strategy: 'jwt',
      accessToken: window.localStorage.learnla,
      platform: 'teacher',
    });

    console.log('authentication:', res);
  } catch (err) {
    console.log('Not authenticate', err);
  }
};
//

const pwdLogin = async (phone, password) => {
  try {
    const res = await feathersClient.authenticate({
      strategy: 'local',
      phone,
      password,
      platform: 'teacher',
    });

    console.log('User created: ', res);
  } catch (err) {
    console.log('not authenticate', err);
  }
};
//
//
//
//
//
const updateTeacher = async (id, data) => {
  try {
    const res = await feathersClient.service('teachers').patch(id, data);
    console.log("updated teacher's profile", res);
  } catch (err) {
    console.log('err', err);
  }
};
//
//
// const res = await FeathersClient.service(`s`)(id, {
//
// const res = await FeathersClient.service(`${APP.platform}s`).patch(id, {
//      courses: [{
//        category: 'test', title: 'test', level: 1, status: 'new',
//      }],
//    });

//
//
const createCourseAd = async data => {
  try {
    const ad = await CourseAdService.create(data);
    console.log('ad created', ad);
  } catch (err) {
    console.log('fail to create ad', err);
  }
};

const modifyCourseAd = async (id, data, params = {}) => {
  try {
    const ad = await CourseAdService.patch(id, data, params);
    console.log('ad modified', ad);
  } catch (err) {
    console.log('modify ad error', err);
  }
};
//

//
//
//
//
// bgLogin();
// updateTeacher('5b4c799d9fe23f8e70eabe8e', { test: 'abc' });
// pwdLogin('85296344902', '1234');
// isNewUser('96344902', '852');
// verifyPhone('96344902', '852', '6098');
// createUser('96344909', '852', 'Paul', '1234');

// updateUser('5b4c799d9fe23f8e70eabe8d', {
//   birthday: new Date(),
//   name: 'Peter',
// });
// ///
//
//
//

class App extends Component {
  state = {
    phone: '85296344902',
    password: '1234',
    profile: {},
  };

  async componentDidMount() {
    try {
      const response = await AuthByJWT();
      this.setState({
        profile: response.profile,
      });
      console.log('authenticated', response);
    } catch (err) {
      console.log('authentication error', err);
    }

    // Handle Auto reauthenticate when socket re-connected
    feathersClient.on('reauthentication-error', async err => {
      console.log('reauthentication-error', err);
      try {
        const response = await AuthByJWT();
        this.setState({
          profile: response.profile,
        });
        console.log('re-authenticated', response);
      } catch (err) {
        console.log('authentication error', err);
      }
    });
  }

  login = async () => {
    const { phone, password } = this.state;
    try {
      const response = await AuthByPassword(phone, password);
      this.setState({
        profile: response.profile,
      });
      console.log('login success', response);
    } catch (err) {
      console.log('login fails', err);
    }
  };

  logout = () => feathersClient.logout();

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
        <h3>{`Hello, ${
          this.state.profile.user ? this.state.profile.user.name : null
        }`}</h3>
        <br />
        <br />
        <label>Phone</label>
        <input
          type="text"
          value={this.state.phone}
          onChange={e => this.setState({ phone: e.target.value })}
        />
        <br />
        <label>Password</label>
        <input
          type="text"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
        />
        <br />
        <button
          onClick={() => this.login()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          LOG IN
        </button>
        <br />
        <br />
        <button
          onClick={() => this.logout()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          LOG OUT
        </button>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default App;
