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
    numOfStudents: 1,
    noSmoking: false,
    requireQualificationProof: true,
    fee: 100,
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


export const fetchMatchingLogs = async (matchingId, to) => {
  return feathersClient.service('matching-logs').find({
    query: { 
      matchingId, to
    },
  });
}

export const archiveMatching = async (matchingId) => {
  return feathersClient.service('matching-logs').patch({ matchingId, archiveAt: new Date() });
}


//
export const sendLog = async (matchingId) => {
 return feathersClient.service('matching-logs').create({
    matchingId,
    to:'teacher',
    logId: '',
    // extra: {},
  });
}


export const updateLog = yarn (matchingLogId) => {
  return feathersClient.service('matching-logs').patch(matchingLogId, {
     extra: {},
  });
}

//
//
//
//
//
//
//
//
// Eeacher Apply
//
//
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

export const applyStudentAd = async studentAdId => {
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
    numOfStudents: 1,
    noSmoking: false,
    requireQualificationProof: true,
    fee: 100,
  });
};


export const fetchMatchingLogs = async (matchingId, to) => {
  return feathersClient.service('matching-logs').find({ 
    query: { 
      matchingId, to
    },
  });
}


export const sendLog = yarn (matchingId) => {
  return feathersClient.service('matching-logs').create({
    matchingId,
    to:'teacher',
    logId: '',
    // extra: {},
  });
}
