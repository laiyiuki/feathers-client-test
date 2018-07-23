import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  feathersClient,
  AuthByJWT,
  AuthByPassword,
  UserService,
  // TeacherService,
  CourseAdService,
} from './services';

import {
  phoneSignUp,
  // verifyPhone,
  teacherSignUpByPhone,
  // getUser,
  // modifyUser,
  // getTeacherProfile,
  modifyTeacherProfile,
  createCourseAd,
  // getCourseAd,
  modifyCourseAd,
  findCourseAds,
} from './controllers';

import { paramsForServer } from 'feathers-hooks-common';
const axios = require('axios');

// const HOST = 'https://quiet-garden-63699.herokuapp.com';
const HOST = 'http://localhost:3030';

// (async function() {
//   console.log('phoneSignUp', await phoneSignUp('85296344902', '852'));
// })();

const createUser = async (phoneNumber, countryCode, name, password) => {
  try {
    const user = await teacherSignUpByPhone({
      phoneNumber,
      countryCode,
      name,
      password,
    });

    const signedIn = await AuthByPassword(user.phone, password, 'teacher');

    console.log('User created: ', user);
    console.log('signed In', signedIn);
  } catch (err) {
    console.log('err', err);
  }
};

const updateTeacher = async (id, data) => {
  try {
    const res = await modifyTeacherProfile(id, data);
    console.log("updated teacher's profile", res);
  } catch (err) {
    console.log('err', err);
  }
};
//
//
////
// const createCourseAd = async data => {
//   try {
//     const ad = await CourseAdService.create(data);
//     console.log('ad created', ad);
//   } catch (err) {
//     console.log('fail to create ad', err);
//   }
// };

//
// bgLogin();
// updateTeacher('5b4ff3e2cb8b3904c39843f5', {
//   user: { name: 'Thomas Lai' },
//   role: 'personal',
// });
// pwdLogin('85296344902', '1234');
// isNewUser('96344902', '852');
// verifyPhone('96344902', '852', '6098');
// createUser('96344902', '852', 'Thomas', '1234');

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
    name: '',
    phoneNumber: '',
    countryCode: '852',
    phone: '85296344902',
    password: '1234',
    profile: {},
    courseAdId: '',
  };

  async componentDidMount() {
    try {
      // const response = await feathersClient.authenticate({
      //   strategy: 'facebookTokenTeacher',
      //   access_token:
      //     'EAADWZA0P77j0BAGoM3vaXUQc6BIqlyEz9aKt5lHzPYtGGdZAqklRZCGQjORo8MJbmUAGDRdJhp9Tsp7cZAfZB0UwQZBXpgtGcnRGpb2WdqDheNoR0ZBRGatnoV0M90DIzKSqjtGZBNKHXvZCtWStvSJkgBkUyUlCcFWDlTuRcZBXi5x75iMMRf94jTSnIP7VZCXBF1zsL13XQXfc6IltpmDdLt6orlj8SZABMZCIZD',
      //   platform: 'teacher',
      // });
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

  signUp = async () => {
    try {
      const { phoneNumber, countryCode, name, password } = this.state;
      feathersClient.logout();
      const user = await teacherSignUpByPhone({
        phoneNumber,
        countryCode,
        name,
        password,
      });

      const response = await AuthByPassword(user.phone, password, 'teacher');
      this.setState({
        profile: response.profile,
      });

      console.log('User created: ', user);
      console.log('auto logIn', response.profile.user);
    } catch (err) {
      console.log('sign up error', err);
    }
  };

  login = async () => {
    const { phone, password } = this.state;
    try {
      const response = await AuthByPassword(phone, password, 'teacher');
      this.setState({
        profile: response.profile,
      });
      console.log('login success', response);
    } catch (err) {
      console.log('login fails', err);
    }
  };

  logout = () => {
    feathersClient.logout();
    this.setState({
      profile: {},
    });
  };

  modifyTeacher = async () => {
    try {
      const teacher = await modifyTeacherProfile(this.state.profile._id, {
        user: { name: 'Thomas Lai' },
        role: 'personal',
      });
      this.setState({
        profile: teacher,
      });
      console.log("updated teacher's profile", teacher);
    } catch (err) {
      console.log('err', err);
    }
  };

  createAd = async () => {
    try {
      // const updatedUser = await modifyTeacherProfile(this.state.profile._id, {
      //   fee: 10000,
      // });
      // console.log('updatedUser', updatedUser);

      const ad = await createCourseAd({
        title: 'English Class',
        fee: 200,
        duration: 60,
      });
      this.setState({
        courseAdId: ad._id,
      });
      console.log('new course ad created', ad);
    } catch (err) {
      console.log('create course ad error', err);
    }
  };

  changeAd = async () => {
    try {
      const ad = await modifyCourseAd(this.state.courseAdId, {
        title: 'English Class',
        fee: 200,
      });
      console.log('updated course Ad', ad);
    } catch (err) {
      console.log('create course ad error', err);
    }
  };

  findMyCourseAds = async () => {
    try {
      const query = {
        teacherId: this.state.profile._id,
        removedAt: { $exists: false },
      };
      const { data } = await findCourseAds(query);

      console.log('my course ads', data);
    } catch (err) {
      console.log('find my couse add error', err);
    }
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
        <h3>{`Hello, ${
          this.state.profile && this.state.profile.user
            ? this.state.profile.user.name
            : null
        }`}</h3>
        <br />
        <h3>Sign Up</h3>
        <form>
          <label>Name</label>
          <input
            type="text"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <br />
          <label>Phone Number</label>
          <input
            type="text"
            value={this.state.phoneNumber}
            onChange={e => this.setState({ phoneNumber: e.target.value })}
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
            onClick={() => this.signUp()}
            type="button"
            style={{ cursor: 'pointer' }}
          >
            Sign Up
          </button>
        </form>

        <br />
        <hr />
        <h3>Log In</h3>
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
        <button
          onClick={() => this.modifyTeacher()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          Update Teacher Profile
        </button>
        <br />
        <br />
        <br />
        <button
          onClick={() => this.createAd()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          Create Course Ad
        </button>
        <br />
        <br />
        <br />
        <br />
        <button
          onClick={() => this.findMyCourseAds()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          My Course Ads
        </button>
        <br />
        <br />
        <br />
        <button
          onClick={() => this.changeAd()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          Update Ad
        </button>
        <br />
      </div>
    );
  }
}

export default App;
