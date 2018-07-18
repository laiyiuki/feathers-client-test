import feathersClient from './feathersSocketClient';

const AuthByJWT = async () => {
  return feathersClient.authenticate({
    strategy: 'jwt',
    accessToken: window.localStorage.learnla,
    platform: 'teacher',
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

const UserService = feathersClient.service('users');
const TeacherService = feathersClient.service('teachers');
const CourseAdService = feathersClient.service('course-ads');

export {
  feathersClient,
  AuthByJWT,
  AuthByPassword,
  UserService,
  TeacherService,
  CourseAdService,
};
