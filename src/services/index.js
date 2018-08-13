import feathersClient from './feathersSocketClient';

const AuthByJWT = async () => {
  return feathersClient.authenticate({
    strategy: 'jwt',
    accessToken: window.localStorage.learnla,
    platform: 'student',
  });
};

const AuthByPassword = async (phone, password, platform) => {
  return feathersClient.authenticate({
    strategy: 'local',
    phone,
    password,
    platform,
  });
};

const AuthByFacebook = async access_token => {
  return await feathersClient.authenticate({
    strategy: 'facebookTokenTeacher',
    access_token,
    platform: 'student',
  });
};

const UserService = feathersClient.service('users');
const TeacherService = feathersClient.service('teachers');
const CourseAdService = feathersClient.service('course-ads');

export {
  feathersClient,
  AuthByJWT,
  AuthByFacebook,
  AuthByPassword,
  UserService,
  TeacherService,
  CourseAdService,
};
