import { paramsForServer } from 'feathers-hooks-common';
import { feathersClient } from '../services';

export const saveCourseAds = async (studentId, courseAdId) => {
  return feathersClient.service('students').patch(studentId, {
    $addToSet: {
      bookmarks: courseAdId,
    },
  });
};

export const unsaveCourseAds = async (studentId, courseAdId) => {
  return feathersClient.service('students').patch(studentId, {
    $pull: {
      bookmarks: courseAdId,
    },
  });
};

export const fetchAllBookmarkedCourseAds = async bookmarks => {
  return feathersClient.service('course-ads').find({
    query: {
      _id: { $in: bookmarks },
      $limit: 5,
      $skip: 0,
      $sort: { updatedAt: -1 },
    },
  });
};

export const saveStudentAds = async (teacherId, studentAdId) => {
  return feathersClient.service('teachers').patch(teacherId, {
    $addToSet: {
      bookmarks: studentAdId,
    },
  });
};

export const unsaveStudentAds = async (teacherId, studentAdId) => {
  return feathersClient.service('teachers').patch(teacherId, {
    $pull: {
      bookmarks: studentAdId,
    },
  });
};

export const fetchAllBookmarkedStudentAds = async bookmarks => {
  return feathersClient.service('student-ads').find({
    query: {
      _id: { $in: bookmarks },
      $limit: 5,
      $skip: 0,
      $sort: { updatedAt: -1 },
    },
  });
};
