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
  getCourseAd,
  modifyCourseAd,
  findCourseAdsByTeacherId,
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
 * @param  {Object} data
 * @param  {Object} params    Additional params for server
 * @return {Object}           Updated user object
 */
async function modifyUser(userId, data, params = { query: {}, action: null }) {
  return UserService.patch(userId, data, paramsForServer(params));
}

/**
 * [getTeacherProfile description]
 * @param  {string} teacherId
 * @return {object}           Teacher profile
 */
async function getTeacherProfile(teacherId) {
  return TeacherService.get(teacherId);
}

async function modifyTeacherProfile(
  teacherId,
  data,
  params = { query: {}, action: null },
) {
  return TeacherService.patch(teacherId, data, paramsForServer(params));
}

async function getCourseAd(courseAdId) {
  return CourseAdService.get(courseAdId);
}

async function modifyCourseAd(
  courseAdId,
  data,
  params = { query: {}, action: null },
) {
  return CourseAdService.patch(courseAdId, data, paramsForServer(params));
}

async function findCourseAdsByTeacherId(teacherId, paginate = false) {
  return CourseAdService.find(
    paramsForServer({
      query: {
        teacherId,
      },
      paginate,
    }),
  );
}

/**
 * [findCourseAds description]
 * @param  {object}  [query={}]       query for course ads
 * @param  {Boolean} [paginate=true]  if true, return with pagination
 * @return {Array|Object}             if paginate set true, return Object"
 *                                    { total: 0, limit: 0, skip: 0, data: [courseAds] },
 *                                    if paginate set false: return [coursAds]
 */
async function findCourseAds(query = {}, paginate = true) {
  return CourseAdService.find(paramsForServer({ query, paginate }));
}
