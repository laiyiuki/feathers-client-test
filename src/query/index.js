const findMyCourseAds = {
  teacherId: 'ddddddd',
  removedAt: { $exists: false },
};

const findCourseAds = {
  removedAt: { $exists: false },
  onlineAt: { $exists: true },
  title: '',
  category: '',
  level: 1,
  experience: { $gte: 1 },
  fee: { $lte: 200 },
  timeTable: { $in: perferredTimeTable },
  'location.geo': {
    $near: {
      $geometry: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
      $minDistance: 0,
      $maxDistance: parseFloat(distance) * 1000,
    },
  },
  $limit: 25,
  $skip: 0,
  $sort: { fee: 1 },
};
