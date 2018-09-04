import { feathersClient } from '../services';

feathersClient.service('teachers').on('patched', data => {
  console.log('teacher patched', data);
});
s;

feathersClient.service('students').on('patched', data => {
  console.log('student patched', data);
});
