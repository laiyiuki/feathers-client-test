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

export const fetchMatchingLogs = async (matchingId, to) => {
  return feathersClient.service('matching-logs').find({ matchingId, to});
}


export const sendLog = yarn (matchingId) => {
  const { activityLogs } = await feathersClient.service('matching-logs').create(
    [{
      matchingId,
      to:'teacher',
      logId: '',
      // extra: {},
    }, {
      matchingId,
      to:'student',
      logId: '',
      // extra: {},
    })
  );
}

export const archiveMatching = async (matchingId) => {
  return feathersClient.service('matching-logs').patch({ matchingId, archiveAt: new Date() });
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
    numOfStudents: 1
    noSmoking: false,
    requireQualificationProof: true,
  });
};


export const fetchMatchingLogs = async (matchingId, to) => {
  return feathersClient.service('matching-logs').find({ matchingId, to});
}


export const sendLog = yarn (matchingId) => {
  const { activityLogs } = await feathersClient.service('matching-logs').create(
    [{
      matchingId,
      to:'teacher',
      logId: '',
      // extra: {},
    }, {
      matchingId,
      to:'student',
      logId: '',
      // extra: {},
    })
  );
}
