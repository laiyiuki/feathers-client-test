import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { feathersClient } from './services';
import { paramsForServer } from 'feathers-hooks-common';
import axios from 'axios';

import { levelsHobby, courses, categories } from './json/courses';

const HOST = 'https://api.learnla.app';

// import {
//   phoneSignUp,
//   verifyPhone,
//   teacherSignUpByPhone,
//   // getUser,
//   // modifyUser,
//   // getTeacherProfile,
//   modifyTeacherProfile,
//   createCourseAd,
//   // getCourseAd,
//   modifyCourseAd,
//   findCourseAds,
// } from './controllers';

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
    facebookTokenStudent:
      'EAADGpCGxZAboBALi5X22ltuZCvsVE3c0DgPJEijTW6cHxJ45UbHI79KRlvgBnHiCHQbwPPoOLKDDas096jDz36iFSilRNcX0l40m2UNKjubgssV1wHvZBy2YgEZBvQBv8PrhKGOQJSZAi3Pl9sH8cVWGbaTpNVLAZD',
    facebookTokenTeacher:
      'EAADWZA0P77j0BAJOFYRTDGkv36vZAj8gRRRxc4HvZCnD5d5m8t2JJutlSZA3rs5nUFnbiimuGf0XGoa1X90K1Nyyvs7DZBnWyCrDZABd46xR8YwbDxap7adBYRgC9dXy6pZCwCRC4SmA1GNL3dZBkOs0ybcxqWfPriasAkA0k9ZCuyOGhCdpbBnYSTO63sj7IaMAKPcdEIH9gqgZDZD',
    token: '',
    tokenId: '5b603a6ba899dc134dd38bb8',
    courseAdId: '',
    studentAdId: '',
    matchingId: '',
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

      feathersClient.service('teachers').on('patched', data => {
        console.log('teacher patched event', data);
      });

      feathersClient.service('achievements').on('created', data => {
        console.log('achievement created', data);
      });

      // try {
      //   const approve = await feathersClient.service('teachers').patch(
      //     '5b97512673f8bb00150bc590',
      //     {
      //       verifications: [
      //         {
      //           status: 'approved',
      //           _id: '5b98a8874b7e200015190355',
      //           type: 'id',
      //           image:
      //             'v1536731270/apps/staging/teachers/verifications/dobfkim9t7jo4rwfn3wx',
      //         },
      //       ],
      //     },
      //     paramsForServer({
      //       query: {},
      //       action: 'verification-approval',
      //       subdocumentId: '5b98a8874b7e200015190355',
      //     }),
      //   );
      //   console.log('approve', approve);
      // } catch (err) {
      //   console.log('err', err);
      // }

      // const approve = await feathersClient.service('teachers').patch(
      //   '5b97512673f8bb00150bc590',
      //   {},
      //   paramsForServer({
      //     query: {},
      //     action: 'verification-approval',
      //     subdocumentId: '5b98a8874b7e200015190355',
      //   }),
      // );
      // console.log('approve', approve);

      // const res;
      // ponse = await AuthByJWT();
      // this.setState({
      //   profile: response.profile,
      // });
      //
      // console.log('authenticated', response);
      //
      //
      // try {
      //   const trash = await feathersClient.service('media-trash').create({
      //     mediaType: 'image',
      //     model: 'students',
      //     subdocument: 'courses',
      //     field: 'image',
      //     public_id: '/v0001/avatar.jpg',
      //     courseId: 'abcd',
      //   });
      //   console.log('trash ', trash);
      // } catch (err) {
      //   console.log('purge fail', err);
      // }
      //
      //
      //
      // const admin = await feathersClient.service('admins').create({
      //   name: 'Thomas',
      //   email: 'thomaslai@manhldgs.com',
      //   phoneNumber: '96344902',
      //   countryCode: '852',
      //   password: '1234',
      // });
      // console.log('admin', admin);
    } catch (err) {
      console.log(' error', err);
    }
  }

  updateSetting = async () => {
    try {
      const res1 = await feathersClient
        .service('settings')
        .patch('5b98c774e97b94d2b9e1f3b3', {
          levelsHobby,
          courses,
          categories,
        });
      console.log('updated settings1', res1);

      const res2 = await feathersClient
        .service('settings')
        .patch('5b98c774e97b94d2b9e1f3b2', {
          levelsHobby,
          courses,
          categories,
        });
      console.log('updated settings2', res2);
    } catch (err) {
      console.log('err', err);
    }
  };

  verifyPhone = async () => {
    try {
      const { phoneNumber, countryCode, verifyCode } = this.state;
      const { data } = await axios.post(HOST + '/verify-phone', {
        platform: 'teacher',
        phoneNumber,
        countryCode,
        verifyCode,
      });

      this.setState({
        token: data.token,
      });
      console.log('verify phone success', data);
    } catch (err) {
      console.log('verify phone fail', err);
    }
  };

  studentReqSMS = async () => {
    try {
      const { phoneNumber, countryCode } = this.state;
      const account = await feathersClient.service('students').find(
        paramsForServer({
          query: {
            phoneNumber,
            countryCode,
          },
          action: 'phone-sign-up',
        })
      );
      console.log('student req sms', account);
    } catch (err) {
      console.log('student req sms', err);
    }
  };

  teacherReqSMS = async () => {
    try {
      const { phoneNumber, countryCode } = this.state;
      const account = await feathersClient.service('teachers').find(
        paramsForServer({
          query: {
            phoneNumber,
            countryCode,
          },
          action: 'phone-sign-up',
        })
      );
      console.log('teacher req sms', account);
    } catch (err) {
      console.log('teacher req sms', err);
    }
  };

  studentSignUp = async () => {
    try {
      const { phoneNumber, countryCode, password, name, token } = this.state;
      const student = await feathersClient.service('students').create({
        phoneNumber,
        countryCode,
        password,
        name,
        token,
        oneSignalIds: ['28bb5a8a-ee7a-4675-bf19-0571b18e5754'],
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

  setComplete = async () => {
    try {
      const { studentId } = this.state;
      const student = await feathersClient
        .service('students')
        .patch(
          studentId,
          { status: 'complete' },
          paramsForServer({ action: 'set-profile-complete' })
        );
      console.log('student updasted', student);
    } catch (err) {
      console.log('updated fail', err);
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
        oneSignalIds: ['28bb5a8a-ee7a-4675-bf19-0571b18e5754'],
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
      const { phoneNumber, countryCode, password, name, token } = this.state;
      const teacher = await feathersClient.service('teachers').create({
        phoneNumber,
        countryCode,
        password,
        name,
        token,
        oneSignalIds: ['28bb5a8a-ee7a-4675-bf19-0571b18e5754'],
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

  createCourseAd = async () => {
    try {
      const courseAd = await feathersClient.service('course-ads').create({
        title: 'Good Course',
      });
      this.setState({
        courseAdId: courseAd._id,
      });

      console.log('course ad created', courseAd);
      // const updated_courseAd = await feathersClient
      //   .service('course-ads')
      //   .patch(courseAd._id, {
      //     onlineAt: new Date(),
      //   });

      // console.log('updated course ad', updated_courseAd);
    } catch (err) {
      console.log('course ad created fail', err);
    }
  };

  createStudentAd = async () => {
    try {
      const studentAd = await feathersClient.service('student-ads').create({
        title: 'Good Ad',
        onlineAt: new Date(),
      });
      this.setState({
        studentAdId: studentAd._id,
      });
      console.log('student ad created', studentAd);
      const updated_studentAd = await feathersClient
        .service('student-ads')
        .patch(studentAd._id, {
          onlineAt: new Date(),
        });
      console.log('updated_studentAd', updated_studentAd);
    } catch (err) {
      console.log('student ad created fail', err);
    }
  };
  //
  //
  applyCourse = async () => {
    try {
      // const { courseAdId } = this.state;
      // const matching = await feathersClient.service('matchings').create({
      //   courseAdId,
      // });

      // this.setState({
      //   matchingId: matching._id,
      // });

      const matching = await feathersClient.service('matchings').create({
        // courseAdId: '5bcd76e328c013d1e0fec712', // local
        courseAdId: '5c131366d1b532001662397c', // staging
        timeTable: [37, 38, 39, 40],
        numOfStudents: 1,
        studentHeadline: '你邀請老師Gggg上門指導',
        teacherHeadline: '我們的國家請你上門指導',
        title: '體育科',
        category: '小學',
        level: 5,
        fee: 200,
        duration: 60,
        homeTuition: true,
        noSmoking: false,
        startDate: new Date(),
        location: {
          geo: {
            type: 'Point',
            coordinates: [114.142449, 22.2811673],
          },
          categories: [1, 2],
        },
        requireQualificationProof: false,
      });

      console.log('matching created', matching);
    } catch (err) {
      console.log('matching created fail', err);
    }
  };
  //
  //
  initSettings = async () => {
    try {
      const studentSettings = await feathersClient.service('settings').create({
        platform: 'student',
      });
      const teacherSettings = await feathersClient.service('settings').create({
        platform: 'teacher',
      });

      // const teacherSettings = await feathersClient
      //   .service('settings')
      //   .patch('5b9635b7f14081a9ee8415cc', {
      //     welcomeCoin: 600,
      //   });
      console.log('teacher settings', teacherSettings);

      console.log('student settings', studentSettings);
    } catch (err) {
      console.log('matching created fail', err);
    }
  };
  //
  //
  createTicket = async () => {
    try {
      const ticket = await feathersClient.service('tickets').create(
        {
          type: 'feedback',
          content: 'Good',
        },
        paramsForServer({ action: 'reward' })
      );

      // const ticket = await feathersClient
      //   .service('tickets')
      //   .patch('5b978889f26a920015013d37', {
      //     type: 'help',
      //   });

      console.log('ticket created', ticket);
    } catch (err) {
      console.log('ticket create fail', err);
    }
  };
  //
  //
  adminLogin = async () => {
    try {
      const admin = await feathersClient.authenticate({
        phone: '85296344902',
        // countryCode: '852',
        password: this.state.password,
        strategy: 'local',
        platform: 'admin',
      });

      // this.setState({
      //   name: teacher.name,
      //   phone: teacher.phone,
      //   teacherId: teacher._id,
      //   profile: teacher,
      // });
      console.log('admin login', admin);
    } catch (err) {
      console.log('admin login fail', err);
    }
  };
  //
  //
  filter = async () => {
    try {
      const result = await feathersClient.service('course-ads').find({
        query: {
          // category: 'English',
          // level: 1,
          // fee: { $lte: 300 },
          'location.geo': {
            $geoWithin: {
              $centerSphere: [[114.129427, 22.2829495], 10 / 6378.1],
            },

            //   $nearSphere: {
            //     $geometry: {
            //       type: 'Point',
            //       coordinates: [114.129427, 22.2829495],
            //     },
            //     $minDistance: 0,
            //     $maxDistance: 35000,
            //     spherical: true,
            //   },
          },
          $limit: 150,
          $skip: 0,
          $sort: { fee: 1 },
        },
      });
      console.log('result', result);
    } catch (err) {
      console.log(err);
    }
  };
  //
  //
  getAchievements = async () => {
    try {
      const achievements = await feathersClient.service('achievements').find({
        query: {},
      });
      console.log('achievements', achievements);
    } catch (err) {
      console.log(err);
    }
  };
  //
  //
  redeem = async () => {
    try {
      const redeem = await feathersClient
        .service('achievements')
        .patch(
          '5ba138323433714eddac545d',
          {},
          paramsForServer({ action: 'redeem' })
        );
      console.log('redeemed', redeem);
    } catch (err) {
      console.log(err);
    }
  };
  //
  //
  approve = async () => {
    try {
      const res = await feathersClient.service('teachers').patch(
        '5b9a2e33930e84e78ceb3352',
        {
          name: 'John',
          verifications: [
            {
              status: 'approved',
              _id: '5ba0bfd5ab198e001496a1da',
              type: 'id',
              image:
                'v1537261524/apps/staging/teachers/verifications/hkgln5omxtklkjytjtcf',
              approvedBy: '5b962a35ebd1390015b5bfd0',
            },
          ],
        },
        paramsForServer({
          action: 'verification-approval',
          subdocumentId: '5ba0bfd5ab198e001496a1da',
        })
      );

      console.log('patched', res);
    } catch (err) {
      console.log(err);
    }
  };

  //
  //
  //
  saveOnesignalId = async () => {
    try {
      // const { studentId } = this.state;
      const res = await feathersClient
        .service('students')
        .patch('5b9a4483a7da72ea17b441a0', {
          $addToSet: {
            oneSignalIds: 'cde',
          },
        });
      console.log('patched', res);
    } catch (err) {
      console.log(err);
    }
  };
  //
  //
  //
  notification = async () => {
    try {
      // const { studentId } = this.state;
      const res = await axios.post('http://localhost:3030/notification', {});

      console.log('patched', res);
    } catch (err) {
      console.log(err);
    }
  };
  //
  //
  getStatistics = async () => {
    try {
      const stats = await feathersClient.service('admins').find(
        paramsForServer({
          action: 'get-statistics',
        })
      );
      console.log('statistics', stats);
    } catch (err) {
      console.log('err', err);
    }
  };
  //
  //
  //
  incCourseView = async () => {
    try {
      const res = await feathersClient.service('course-ads').patch(
        // '5bcd76e328c013d1e0fec712',
        '5bd93c76400c2f0f2d309706',
        // '5bd6db4a70cc6d242747bceb',
        {},
        paramsForServer({
          action: 'inc-view-count',
        })
      );
      console.log('view count', res);
    } catch (err) {
      console.log('err', err);
    }
  };
  //
  //
  //
  //
  setCourseOnline = async () => {
    try {
      const res = await feathersClient
        .service('course-ads')
        .patch('5bd93c76400c2f0f2d309706', { onlineAt: new Date() });

      console.log('setCourseOnline', res);
    } catch (err) {
      console.log('setCourseOnline err', err);
    }
  };
  //
  //
  setCourseOffline = async () => {
    try {
      const res = await feathersClient
        .service('course-ads')
        .patch('5bd93c76400c2f0f2d309706', { onlineAt: null });

      console.log('setCourseOffline', res);
    } catch (err) {
      console.log('setCourseOffline err', err);
    }
  };
  //
  //
  //
  //
  setStudentAdOnline = async () => {
    try {
      const res = await feathersClient
        .service('student-ads')
        .patch('5bd6db4a70cc6d242747bceb', { onlineAt: new Date() });

      console.log('setStudentAdOnline', res);
    } catch (err) {
      console.log('setStudentAdOnline err', err);
    }
  };
  //
  //
  setStudentAdOffline = async () => {
    try {
      const res = await feathersClient
        .service('student-ads')
        .patch('5bd6db4a70cc6d242747bceb', { onlineAt: null });

      console.log('setStudentAdOffline', res);
    } catch (err) {
      console.log('setStudentAdOffline err', err);
    }
  };
  //
  //
  setAvatarAchievements = async () => {
    try {
      const teachers = await feathersClient.service('teachers').find({
        query: {
          avatar: { $exists: true, $ne: null },
          $limit: 1000,
        },
      });

      const teacherIds = teachers.data.map(teacher => teacher._id);
      console.log('teacherIds', teacherIds);

      const achievements = await feathersClient.service('achievements').find({
        query: {
          category: 'signUp',
          type: 'avatar',
          ownerType: 'teacher',
        },
      });

      const teacherIdsWithAchievement = achievements.data.map(
        achievement => achievement.ownerId
      );

      console.log('achievements', achievements);

      console.log('teacherIdsWithAchievement', teacherIdsWithAchievement);

      const result = teacherIds.filter(
        teacherId => teacherIdsWithAchievement.indexOf(teacherId) === -1
      );

      console.log('result', result);
      for (const id of result) {
        try {
          const response = await feathersClient
            .service('teachers')
            .patch(id, {}, paramsForServer({ action: 'set-avatar' }));

          console.log('final res', response);
        } catch (err) {
          console.log(`update teacherId ${id} err`, err);
        }
      }

      // console.log('set avatar achievements', teachers);
    } catch (err) {
      console.log('set avatar achievements err', err);
    }
  };
  //
  //
  //
  //
  //
  requestPhone = async () => {
    try {
      const res = await feathersClient
        .service('matchings')
        .patch(
          '5c08fb5157d890001624d1c4',
          {},
          paramsForServer({ action: 'request-phone' })
        );

      console.log('requestPhone', res);
    } catch (err) {
      console.log('requestPhone err', err);
    }
  };
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
          onClick={() => this.studentReqSMS()}
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
        <button
          onClick={() => this.teacherReqSMS()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          Teacher request sms verification
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
            value={this.state.token}
            onChange={e => this.setState({ token: e.target.value })}
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
          <label>Token</label>
          <input
            type="text"
            value={this.state.token}
            onChange={e => this.setState({ token: e.target.value })}
          />
          <br />
          <button
            onClick={() => this.teacherSignUp()}
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
        <br />
        <br />
        <h3>Create Course Ad</h3>
        <button
          onClick={() => this.createCourseAd()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          Create Coursse
        </button>
        <br />
        <br />
        <hr />
        <br />s<h3>Create Student Ad</h3>
        <button
          onClick={() => this.createStudentAd()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          Create Student Ad
        </button>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <h3>Appy Course</h3>
        <button
          onClick={() => this.applyCourse()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          Apply Course
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <h3>init app setttings</h3>
        <button
          onClick={() => this.initSettings()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          init Settings
        </button>
        <br />
        <br />
        <br />
        <br />
        <h3>Create Ticket</h3>
        <button
          onClick={() => this.createTicket()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          create ticket
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h3>Admin Login</h3>
        <br />
        <label>Password</label>
        <input
          type="password"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
        />
        <br />
        <button
          onClick={() => this.adminLogin()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          admin login
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h3>Filter</h3>
        <button
          onClick={() => this.filter()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          filter
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h3>set student profile complete</h3>
        <button
          onClick={() => this.setComplete()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          set complete
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h3>verification approval</h3>
        <button
          onClick={() => this.getAchievements()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          approve
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h3>save oneSignal Id</h3>
        <button
          onClick={() => this.saveOnesignalId()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          save
          <br />
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h3>Notification</h3>
        <button
          onClick={() => this.notification()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          notification
          <br />
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h3>Statistics</h3>
        <button
          onClick={() => this.getStatistics()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          getStatistics
          <br />
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h3>view Course</h3>
        <button
          onClick={() => this.incCourseView()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          view Course
          <br />
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h3>Set Course Online/Offline</h3>
        <button
          onClick={() => this.setCourseOffline()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          Offline
          <br />
        </button>
        <button
          onClick={() => this.setCourseOnline()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          Online
          <br />
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h3>Set student-ad Online/Offline</h3>
        <button
          onClick={() => this.setStudentAdOffline()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          Offline
          <br />
        </button>
        <button
          onClick={() => this.setStudentAdOnline()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          Online
          <br />
        </button>
        <br />
        <br />
        updateSetting
        <br />
        <br />
        <br />
        <h3>Update Setting</h3>
        <button
          onClick={() => this.updateSetting()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          Update Settings
        </button>
        <br />
        <br />
        <br />
        {/* <br />
        <h3>Set Avatar achievements</h3>
        <button
          onClick={() => this.setAvatarAchievements()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          Set Avatar Achievement
        </button>
        <br /> */}
        <br />
        <br />
        <br />
        <br />
        <h3>request phone</h3>
        <button
          onClick={() => this.requestPhone()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          request phone
        </button>
        <br />
        <br />
      </div>
    );
  }
}

export default App;
