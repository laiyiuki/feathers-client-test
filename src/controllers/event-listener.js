import { feathersClient } from '../services';

feathersClient.service('teachers').on('patched', data => {
  console.log('teacher patched', data);
});

feathersClient.service('teachers').on('patched', data => {
  console.log('teacher patched', data);
});
