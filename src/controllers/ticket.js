import { paramsForServer } from 'feathers-hooks-common';
import { feathersClient } from '../services';

export const createTicket = async (type, content) => {
  return feathersClient.service('tickets').create({
    type,
    content,
  });
};
