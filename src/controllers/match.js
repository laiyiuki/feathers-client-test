import { paramsForServer } from 'feathers-hooks-common';
import { feathersClient } from '../services';

//
// Student Apply
//
export const applyCourse = async courseAdId => {
  return feathersClient.service('matchings').create({
    courseAdId,
    studentHeadline: '',
    teacherHeadline: '',
    title: '',
    category: '',
    level: '',
    timeslots: [],
    timeTable: [],
    location: {},
    duration: 60,
    homeTuition: true,
    startDate: new Date(),
    numOfStudents: 1
    noSmoking: false,
    requireQualificationProof: true,
  });
};

export const fetchAllmatchingsByStudentId = async studentId => {
  return feathersClient.service('matchings').find({
    query: {
      studentId,
      archiveAt: { $exists: false },
      removedAt: { $exists: false },
      $limit: 5,
      $skip: 0,
      // $sort: { 'activityLogs[0].createAd': -1 },
    },
  });
};

//
// Eeacher Apply
//
export const fetchAllmatchingsByTeacherId = async teacherId => {
  return feathersClient.service('matchings').find({
    query: {
      teacherId,
      archiveAt: { $exists: false },
      removedAt: { $exists: false },
      $limit: 5,
      $skip: 0,
      // $sort: { 'activityLogs[0].createAd': -1 },
    },
  });
};

export const connectWithStudent = async studentAdId => {
  return feathersClient.service('matchings').create({
    studentAdId,
    teacherHeadline: '',
    title: '',
    category: '',
    level: '',
    timeslots: [],
    timeTable: [],
    location: {},
    duration: 60,
    homeTuition: true,
    startDate: new Date(),
    numOfStudents: 1
    noSmoking: false,
    requireQualificationProof: true,
  });
};
