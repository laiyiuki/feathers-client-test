import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { feathersClient } from './services';

import {
  phoneSignUp,
  verifyPhone,
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

class App extends Component {
  state = {
    name: '',
    studentId: '',
    teacherId: '',
    phoneNumber: '96344902',
    countryCode: '852',
    phone: '85296344902',
    password: '1234',
    profile: {},
    courseAdId: '',
    facebookTokenStudent: '',
    facebookTokenTeacher: '',
    token: 'JIbkNdtCqF',
    tokenId: '5b603a6ba899dc134dd38bb8',
  };

  async componentDidMount() {
    try {
      const auth = await feathersClient.authenticate();
      console.log('auth', auth);

      // const response = await AuthByJWT();
      // this.setState({
      //   profile: response.profile,
      // });
      //
      // console.log('authenticated', response);
    } catch (err) {
      console.log('authentication error', err);
    }
  }

  studentSignUp = async () => {
    try {
      const { phone, password, name } = this.state;
      const student = await feathersClient.service('students').create({
        phone,
        password,
        name,
      });
      this.setState({
        name: student.name,
        phone: student.phone,
        studentId: student._id,
      });
      console.log('Student created', student);
    } catch (err) {
      console.log('student create fail', err);
    }
  };

  logout = async () => {
    try {
      const user = await feathersClient
        .service('students')
        .find({ query: { phone: '85296344902' } });
      console.log('user', user);
    } catch (err) {
      console.log('err', err);
    }
    // feathersClient.logout();
  };

  studentLogin = async () => {
    try {
      const { phone, password } = this.state;
      const student = await feathersClient.authenticate({
        strategy: 'local',
        phone,
        password,
        platform: 'student',
      });
      console.log('login success', student);
    } catch (err) {
      console.log('login', err);
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
        <h3>Student Sign Up</h3>
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
            onClick={() => this.studentSignUp()}
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
          onClick={() => this.studentLogin()}
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

        {/* <br />
        <button
          onClick={() => this.findAllCourse()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          find all course
        </button>
        <br /> */}
      </div>
    );
  }
}

export default App;
