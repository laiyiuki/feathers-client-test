import axios from 'axios';
import { paramsForServer } from 'feathers-hooks-common';
import { UserService, TeacherService, CourseAdService } from '../services';

// const HOST = 'https://quiet-garden-63699.herokuapp.com';
const HOST = 'http://localhost:3030';

export {
  phoneSignUp,
  verifyPhone,
  teacherSignUpByPhone,
  getUser,
  modifyUser,
  getTeacherProfile,
  modifyTeacherProfile,
  createCourseAd,
  getCourseAd,
  modifyCourseAd,
  // findCourseAdsByTeacherId,
  findCourseAds,
};

/**
 * [phoneSignUp description]
 * @param  {string}  phoneNumber
 * @param  {string}  countryCode
 * @return {Boolean}             true: is new user
 */
async function phoneSignUp(phoneNumber, countryCode) {
  const response = await UserService.find(
    paramsForServer({
      query: {
        phoneNumber,
        countryCode,
      },
      action: 'phone-sign-up',
    }),
  );

  if (response.total > 0) {
    return false;
  }

  return true;
}

/**
 * [verifyPhone description]
 * @param  {string} phoneNumber
 * @param  {string} countryCode
 * @param  {string} verifyCode
 * @return {object}
 */
async function verifyPhone(phoneNumber, countryCode, verifyCode) {
  return axios.post(`${HOST}/verify-phone`, {
    phoneNumber,
    countryCode,
    verifyCode,
  });
}

/**
 * [teacherSignUpByPhone description]
 * @param  {Object} data
 * @return {Object}      Created user
 */
async function teacherSignUpByPhone(data) {
  return UserService.create(
    data,
    paramsForServer({ action: 'phone-sign-up', platform: 'teacher' }),
  );
}

/**
 * [getUser description]
 * @param  {string} userId
 * @return {Object}
 */
async function getUser(userId) {
  return UserService.get(userId);
}

/**
 * [modifyUser description]
 * @param  {string} userId
 * @param  {object} data   data to be modified
 * @param  {object} flag   Optional flag for paramsForServer
 * @return {object}        Modified user
 */
async function modifyUser(userId, data, flag) {
  let params = undefined;
  if (flag) {
    params = paramsForServer(flag);
  }

  return UserService.patch(userId, data, params);
}

/**
 * [getTeacherProfile description]
 * @param  {string} teacherId
 * @return {object}           Teacher profile
 */
async function getTeacherProfile(teacherId) {
  return TeacherService.get(teacherId);
}

/**
 * [modifyTeacherProfile description]
 * @param  {string} teacherId
 * @param  {object} data      data to be modified
 * @param  {Object} flag      [Optional] additional flag for paramsForServer
 * @return {Object}           full modified teacher profile
 */
async function modifyTeacherProfile(teacherId, data, flag) {
  let params = undefined;

  if (flag) {
    params = paramsForServer(flag);
  }

  return TeacherService.patch(teacherId, data, params);
}

/**
 * [createCourseAd description]
 * @param  {object} data
 * @return {object}      new course ad
 */
async function createCourseAd(data) {
  return CourseAdService.create(data);
}

/**
 * [getCourseAd description]
 * @param  {string} courseAdId
 * @return {object}            course ad
 */
async function getCourseAd(courseAdId) {
  return CourseAdService.get(courseAdId);
}

/**
 * [modifyCourseAd description]
 * @param  {string} courseAdId
 * @param  {object} data       data to be modified
 * @param  {object} flag       Optional flag for paramsForServer
 * @return {object}            Modified course ad
 */
async function modifyCourseAd(courseAdId, data, flag) {
  let params = undefined;
  if (params) {
    params = paramsForServer(flag);
  }

  return CourseAdService.patch(courseAdId, data, params);
}

// async function findCourseAdsByTeacherId(teacherId, flag={}) {
//   let params = undefined;
//   if (flag) {
//     params = paramsForServer(flag);
//   }
//
//   return CourseAdService.find(
//     paramsForServer({
//       query: {
//         teacherId,
//       },
//       paginate,
//     }),
//   );
// }

/**
 * [findCourseAds description]
 * @param  {object} [query={}]
 * @param  {Object} flag       Optional flag for server
 * @return {Object}            { total: 1, limit: 10, skip: 1, data: [couseAd] }
 */
async function findCourseAds(query = {}, flag) {
  return CourseAdService.find(paramsForServer({ query, ...flag }));
}
