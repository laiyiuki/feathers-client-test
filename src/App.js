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

import seed from './query/seed';

import { paramsForServer } from 'feathers-hooks-common';
import axios from 'axios';

import { fetchAllBookmarkedCourseAds } from './controllers/bookmarks';

// import { saveCourseAds } from './controllers/bookmarks';

// const seedData = async () => {
//   try {
//     const res = await feathersClient.service('course-ads').create(seed);
//     console.log('seed response', res);
//   } catch (err) {
//     console.log('seed err', err);
//   }
// };
// seedData();

// const HOST = 'https://quiet-garden-63699.herokuapp.com';
const HOST = 'http://localhost:3030';

//
async function test() {
  try {
    // const res = await feathersClient.service('versions').create({
    //   platform: 'student',
    //   minimum: '0.0.1',
    //   latest: '1.0.1',
    // });
    const res = await phoneSignUp('96344902', '852');
    console.log('test', res);
  } catch (err) {
    console.log('test', err);
  }
}
// test();

////
///
/////
const convertTimeslotToTable = timeslot => {
  const startHour = parseInt(timeslot.startTime.split(':')[0]);
  const startMinute = parseInt(timeslot.startTime.split(':')[1]);
  const endHour = parseInt(timeslot.endTime.split(':')[0]);
  const endMinute = parseInt(timeslot.endTime.split(':')[1]);

  const start = startHour * 4 + startMinute / 15;

  let end;
  if (endHour === 0 && endMinute === 0) {
    end = 24 * 4;
  } else {
    end = endHour * 4 + endMinute / 15;
  }

  let table = [];
  for (let day of timeslot.days) {
    let startRange = start + (day - 1) * 24 * 4;
    let endRange = end + (day - 1) * 24 * 4;

    while (startRange < endRange) {
      table.push(startRange + 1);
      startRange++;
    }
  }

  return table;
};

// const uniqueArray = (array) => {
//   return array.filter((elem, pos, arr) => {
//     return arr.indexOf(elem) == pos;
//   });
// }

// function uniq_fast(a) {
//     var seen = {};
//     var out = [];
//     var len = a.length;
//     var j = 0;
//     for(var i = 0; i < len; i++) {
//          var item = a[i];
//          if(seen[item] !== 1) {
//                seen[item] = 1;
//                out[j++] = item;
//          }
//     }
//     return out;
// }

const generateTimeTable = timeslots => {
  let timeTable = [];
  for (let timeslot of timeslots) {
    let table = convertTimeslotToTable(timeslot);
    timeTable = [...timeTable, ...table];
  }

  return [...new Set(timeTable)].sort((a, b) => a - b);
};

//
//
//
const isTimeOverlapped = (timeslot, timeTable) => {
  const table = convertTimeslotToTable(timeslot);
  for (let slot of table) {
    if (timeTable.indexOf(slot) !== -1) {
      return true;
    }
  }
  return false;
};
//
//
//
//
let time = [
  // {
  //   days: [1, 2, 3, 4, 5, 6, 7],
  //   startTime: '00:00',
  //   endTime: '00:00',
  // },
  {
    days: [1, 2],
    startTime: '00:00',
    endTime: '23:45',
  },
  // {
  //   days: [1, 2],
  //   startTime: '00:30',
  //   endTime: '01:30',
  // },
];
const timeTable = generateTimeTable(time);
console.log('timeTable', timeTable);

console.log('timeTable: ', timeTable);

const newSlot = {
  days: [3],
  startTime: '00:00',
  endTime: '00:15',
};

console.log('isTimeOverlapped', isTimeOverlapped(newSlot, timeTable));
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
    token: 'JIbkNdtCqF',
    tokenId: '5b603a6ba899dc134dd38bb8',
  };

  async componentDidMount() {
    try {
      feathersClient.on('authenticated', () => {
        console.log('authenticated event ');
      });
      feathersClient
        .service('course-ads')
        .on('created', () => console.log('created'));
      // test();
      // const user = await feathersClient.service('users').create({
      //   email: '123',
      //   password: '1234',
      // });

      // const response = await feathersClient.authenticate({
      //   strategy: 'facebookTokenTeacher',
      //   access_token:
      //     'EAADWZA0P77j0BAAgr5FuSZBLrFDr6DE5Mw6vpATEuEXvWOhe6ZChUeHr5uJLBk2DitSPiR74nhapdheX6BUkQMNbeZAVcladzgSVZByeNKlfJezVug6LFp4IBzUZAv2kRoQHf2ufDRZBZBAnYZCYVuLZC6oYpgfiHz5Nbj15tyr1O5djtHAo5PhkaUgAZBgYZBCxJcLsghPZA9ahnmGlnAV90guNHAuVwLXkXzskZD',
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

    // const bookmark = async () => {
    //   try {
    //     const result = await saveCourseAds(
    //       '5b63f0be7d2b36a85ddac418',
    //       '5b67ccc6287271afcbf57a21',
    //     );
    //     console.log('bookmarks', result);
    //   } catch (err) {
    //     console.log('bookmarks', err);
    //   }
    // };
    // bookmark();

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
      const {
        token,
        tokenId,
        phoneNumber,
        countryCode,
        name,
        password,
      } = this.state;
      feathersClient.logout();
      const user = await teacherSignUpByPhone({
        phoneNumber,
        countryCode,
        name,
        password,
        token,
        tokenId,
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
      const response = await AuthByPassword(phone, password, 'student');
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

  verifyToken = async () => {
    try {
      const { data } = await verifyPhone('96344902', '852', '6867');
      console.log('verify', data);
      if (data.success) {
        this.setState({
          token: data.token,
          // tokenId: data.tokenId,
        });
      }
    } catch (err) {
      console.log('verifyToken err', err);
    }
  };

  findAllCourse = async () => {
    try {
      const { data } = await feathersClient.service('course-ads').find({
        query: {
          category: 'English',
          level: 1,
          fee: { $lte: 300 },
          'location.geo': {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [114.15891699999997, 22.2849],
              },
              $minDistance: 0,
              $maxDistance: parseFloat(2) * 1000,
            },
          },
          $limit: 20,
          $skip: 0,
          $sort: { fee: 1 },
        },
      });

      console.log('couses', data);
    } catch (err) {
      console.log('find course err', err);
    }
  };

  myBookmarked = async () => {
    try {
      const bookmarks = [
        '5b67ccc6287271afcbf57a21',
        '5b67ccc5287271afcbf57a20',
      ];

      const res = await fetchAllBookmarkedCourseAds(bookmarks);
      console.log('all bookmarked', res);
    } catch (err) {
      console.log('bookmark err', err);
    }
  };

  applyCourse = async () => {
    try {
      const res = await feathersClient.service('matches').create({
        courseAdId: '5b6bcc9187fe47cfef7b9c3c',
      });
      console.log('apply course', res);
    } catch (err) {
      console.log('apply course err', err);
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
        <br />
        <button
          onClick={() => this.verifyToken()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          Verify phone
        </button>
        <br />

        <br />
        <br />
        <button
          onClick={() => this.findAllCourse()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          find all course
        </button>
        <br />

        <br />
        <button
          onClick={() => this.myBookmarked()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          Fetch my bookmarked Course Ads
        </button>
        <br />

        <br />
        <button
          onClick={() => this.applyCourse()}
          type="button"
          style={{ cursor: 'pointer' }}
        >
          Apply Course
        </button>
        <br />
        <br />
      </div>
    );
  }
}

export default App;
