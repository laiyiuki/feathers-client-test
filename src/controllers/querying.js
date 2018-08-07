const findCourseAds = () => async () => {
  try {
    const result = await feathersClient.service('course-ads').find({
      query: {
        category: 'English',
        level: 1,
        fee: { $lte: 300 },
        'location.geo': {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [114.15891699999997, 22.2849],
            },
            $minDistance: 0,
            $maxDistance: parseFloat(2) * 1000,
          },
        },
        $limit: 20,
        $skip: 0,
        $sort: { fee: 1 },
      },
    });
    return result;
  } catch (err) {
    return err;
    console.log(err);
  }
};
