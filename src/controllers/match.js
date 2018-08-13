import { paramsForServer } from 'feathers-hooks-common';
import { feathersClient } from '../services';

//
// Student Apply
//
export const applyCourse = async courseAdId => {
  return feathersClient.service('matches').create({
    courseAdId,
  });
};

export const fetchAllMatchesByStudentId = async studentId => {
  return feathersClient.service('matches').find({
    query: {
      studentId,
      archiveAt: { $exists: false },
      removedAt: { $exists: false },
      $limit: 5,
      $skip: 0,
      $sort: { 'messages[0].createAd': -1 },
    },
  });
};

//
// Eeacher Apply
//
export const fetchAllMatchesByTeacherId = async teacherId => {
  return feathersClient.service('matches').find({
    query: {
      teacherId,
      archiveAt: { $exists: false },
      removedAt: { $exists: false },
      $limit: 5,
      $skip: 0,
      $sort: { 'messages[0].createAd': -1 },
    },
  });
};

export const connectWithStudent = async studentAdId => {
  return feathersClient.service('matches').create({
    studentAdId,
  });
};
