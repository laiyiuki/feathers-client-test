import { paramsForServer } from 'feathers-hooks-common';
import { UserService, TeacherService, CourseAdService } from '../services';

export { getTeacherProfile, modifyTeacherProfile };

async function getTeacherProfile(teacherId) {
  try {
    const profile = await TeacherService.get(teacherId);
    console.log('teacher profile', profile);
  } catch (err) {
    console.log('getTeacherProfile error', err);
  }
}

async function modifyTeacherProfile(
  teacherId,
  data,
  params = { action: null },
) {
  try {
    const profile = await TeacherService.patch(
      teacherId,
      data,
      paramsForServer(params),
    );
    console.log('modified teacher profile', profile);
  } catch (err) {
    console.log('modifyTeacherProfile error', err);
  }
}
