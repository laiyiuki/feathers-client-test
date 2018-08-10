import { paramsForServer } from 'feathers-hooks-common';
import { feathersClient } from '../services';

export const takeCourse = async courseAdId => {
  return feathersClient.service('matches').create({
    courseAdId,
    // ...other fields
  });
};

export const pickStudent = async studentAdId => {
  return feathersClient.service('matches').create({
    studentAdId,
    // ...other fields
  });
};
