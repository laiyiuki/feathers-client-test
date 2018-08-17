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
      archivedAt: { $exists: false },
      studentRemovedAt: { $exists: false },
      $limit: 5,
      $skip: 0,
      // $sort: { 'activityLogs[0].createAd': -1 },
    },
  });
};

export const fetchMatchingLogs = async (matchingId, to) => {
  return feathersClient.service('matching-logs').find({
    query: {
      matchingId,
      to,
    },
  });
};

export const archiveMatching = async matchingId => {
  return feathersClient
    .service('matching-logs')
    .patch(matchingId, { archivedAt: new Date() });
};

export const fetchMatchingBy = async matchingId => {
  return feathersClient
    .service('matching-logs')
    .patch(matchingId, { archivedAt: new Date() });
};

//
export const sendLog = async matchingId => {
  return feathersClient.service('matching-logs').create({
    matchingId,
    to: 'teacher',
    logId: '',
    // extra: {},
  });
};

export const updateLog = async matchingLogId => {
  return feathersClient
    .service('matching-logs')
    .patch(matchingLogId, { extra: {} });
};

export const setLogsAsRead = async (matchingId, to) => {
  return feathersClient.service('matching-logs').patch(
    null,
    { read: new Date() },
    paramsForServer({
      query: {
        matchingId,
        to,
        read: { $exists: false },
      },
      action: 'read',
    }),
  );
};

export const teacherRemoveMatching = async matchingId => {
  return feathersClient
    .service('matchings')
    .patch(matchingId, { teacherRemovedAt: new Date() });
};

// export const setLogsAsRead = async (matchingId, to) => {
//   return feathersClient.service('matchings').patch(
//     matchingId,
//     { to },
//     paramsForServer({
//       action: 'set-logs-as-read',
//     }),
//   );
// };

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
      archivedAt: { $exists: false },
      teacherRemovedAt: { $exists: false },
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

export const studentRemoveMatching = async matchingId => {
  return feathersClient
    .service('matchings')
    .patch(matchingId, { studentRemovedAt: new Date() });
};

// export const fetchMatchingLogs = async (matchingId, to) => {
//   return feathersClient.service('matching-logs').find({
//     query: {
//       matchingId,
//       to
//     }
//   });
// }
//
// export const sendLog = yarn (matchingId) => {
//   return feathersClient.service('matching-logs').create({
//     matchingId,
//     to:'teacher',
//     logId: '',
//     // extra: {},
//   });
// }
