import { paramsForServer } from 'feathers-hooks-common';
import { feathersClient } from '../services';

export const createSettings = async platform => {
  return feathersClient.service('app-settings').create({
    platform,
  });
};

export const getAppSettings = async platform => {
  return feathersClient.service('app-settings').find({ query: { platform } });
};
