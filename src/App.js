import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { feathersClient } from './services';
import { paramsForServer } from 'feathers-hooks-common';
import axios from 'axios';

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
    verifyCode: '',
    phoneNumber: '96344902',
    countryCode: '852',
    phone: '85296344902',
    password: '1234',
    profile: {},
    twillioToken: '',
    courseAdId: '',
    facebookTokenStudent:
      'EAADGpCGxZAboBALi5X22ltuZCvsVE3c0DgPJEijTW6cHxJ45UbHI79KRlvgBnHiCHQbwPPoOLKDDas096jDz36iFSilRNcX0l40m2UNKjubgssV1wHvZBy2YgEZBvQBv8PrhKGOQJSZAi3Pl9sH8cVWGbaTpNVLAZD',
    facebookTokenTeacher:
      'EAADWZA0P77j0BAJOFYRTDGkv36vZAj8gRRRxc4HvZCnD5d5m8t2JJutlSZA3rs5nUFnbiimuGf0XGoa1X90K1Nyyvs7DZBnWyCrDZABd46xR8YwbDxap7adBYRgC9dXy6pZCwCRC4SmA1GNL3dZBkOs0ybcxqWfPriasAkA0k9ZCuyOGhCdpbBnYSTO63sj7IaMAKPcdEIH9gqgZDZD',
    token: 'JIbkNdtCqF',
    tokenId: '5b603a6ba899dc134dd38bb8',
  };

  async componentDidMount() {
    try {
      const auth = await feathersClient.authenticate();
      console.log('auth', auth);
      this.setState({
        name: auth.user.name,
        phone: auth.user.phone,
        profile: auth.user,
      });
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

  verifyPhone = async () => {
    try {
      const { phoneNumber, countryCode, verifyCode } = this.state;
      const res = await axios.post('http://localhost:3030/verify-phone', {
        phoneNumber,
        countryCode,
        verifyCode,
      });
      const data = await res.json();
      this.setState({
        token: data.token,
      });
      console.log('verify phone success', data);
    } catch (err) {
      console.log('verify phone fail', err);
    }
  };

  studentVerifyPhone = async () => {
    try {
      const { phoneNumber, countryCode } = this.state;
      const account = await feathersClient.service('students').find(
        paramsForServer({
          query: {
            phoneNumber,
            countryCode,
          },
          action: 'phone-sign-up',
        }),
      );
      console.log('verifyPhone', account);
    } catch (err) {
      console.log('verifyPhone', err);
    }
  };

  studentSignUp = async () => {
    try {
      const {
        phoneNumber,
        countryCode,
        password,
        name,
        twillioToken,
      } = this.state;
      const student = await feathersClient.service('students').create({
        phoneNumber,
        countryCode,
        password,
        name,
        token: twillioToken,
      });
      this.setState({
        name: student.name,
        phone: student.phone,
        studentId: student._id,
        profile: student,
      });
      console.log('Student created', student);
    } catch (err) {
      console.log('student create fail', err);
    }
  };

  logout = async () => {
    // try {
    //   const user = await feathersClient
    //     .service('students')
    //     .find({ query: { phone: '85296344902' } });
    //   console.log('user', user);
    // } catch (err) {
    //   console.log('err', err);
    // }
    feathersClient.logout();
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
      this.setState({
        name: student.user.name,
        phone: student.user.phone,
        teacherId: student.user._id,
        profile: student.user,
      });
      console.log('login success', student);
    } catch (err) {
      console.log('login', err);
    }
  };

  teacherSignUp = async () => {
    try {
      const { phone, password, name } = this.state;
      const teacher = await feathersClient.service('teachers').create({
        phone,
        password,
        name,
      });
      this.setState({
        name: teacher.name,
        phone: teacher.phone,
        teacherId: teacher._id,
        profile: teacher,
      });
      console.log('Teacher created', teacher);
    } catch (err) {
      console.log('teacher create fail', err);
    }
  };

  teacherLogin = async () => {
    try {
      const { phone, password } = this.state;
      const teacher = await feathersClient.authenticate({
        strategy: 'local',
        phone,
        password,
        platform: 'teacher',
      });
      this.setState({
        name: teacher.user.name,
        phone: teacher.user.phone,
        teacherId: teacher.user._id,
        profile: teacher.user,
      });
      console.log('login success', teacher);
    } catch (err) {
      console.log('login', err);
    }
  };

  studeentFacebookLogin = async () => {
    try {
      const { facebookTokenStudent } = this.state;
      const student = await feathersClient.authenticate({
        strategy: 'facebookTokenStudent',
        access_token: facebookTokenStudent,
        platform: 'student',
      });
      this.setState({
        name: student.user.name,
        phone: student.user.phone,
        studentId: student.user._id,
        profile: student.user,
      });
      console.log('login success', student);
    } catch (err) {
      console.log('login', err);
    }
  };

  teacherFacebookLogin = async () => {
    try {
      const { facebookTokenTeacher } = this.state;
      const teacher = await feathersClient.authenticate({
        strategy: 'facebookTokenTeacher',
        access_token: facebookTokenTeacher,
        platform: 'teacher',
      });
      this.setState({
        name: teacher.user.name,
        phone: teacher.user.phone,
        teacherId: teacher.user._id,
        profile: teacher.user,
      });
      console.log('login success', teacher);
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
        <br />
        <br />

        <h3>{`Hello, ${
          this.state.profile && this ? this.state.profile.name : null
        }`}</h3>

        <br />
        <button
          onClick={() => this.studentVerifyPhone()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          Student request sms verification
        </button>
        <br />

        <br />
        <label>Code</label>
        <input
          type="text"
          value={this.state.verifyCode}
          onChange={e => this.setState({ verifyCode: e.target.value })}
        />
        <br />
        <br />
        <button
          onClick={() => this.verifyPhone()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          Verify Phone
        </button>
        <br />

        <hr />
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
          <label>Token</label>
          <input
            type="text"
            value={this.state.twillioToken}
            onChange={e => this.setState({ twillioToken: e.target.value })}
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

        <br />
        <h3>Student Log In</h3>
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
        <hr />

        <br />
        <h3>Teacher Sign Up</h3>
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
            onClick={() => this.TeacherSignUp()}
            type="button"
            style={{ cursor: 'pointer' }}
          >
            Sign Up
          </button>
        </form>
        <br />
        <hr />

        <br />
        <h3>Teacher Log In</h3>
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
          onClick={() => this.teacherLogin()}
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
        <hr />

        <br />
        <h3>Student Facebook Login</h3>
        <button
          onClick={() => this.studeentFacebookLogin()}
          type="button"
          sstyle={{ cursor: 'pointer' }}
        >
          Student facebook Login
        </button>
        <br />
        <hr />

        <br />
        <h3>Teacher Facebook Login</h3>
        <button
          onClick={() => this.teacherFacebookLogin()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          Teacher facebook Login
        </button>
        <br />
        <hr />
        {/* <br />
        <button
          onClick={() => this.studentVerifyPhone()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          Student request sms verification
        </button>
        <br /> */}
      </div>
    );
  }
}

export default App;
