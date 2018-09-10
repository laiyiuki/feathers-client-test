async function purgeMedia() {
  try {
    const trash = await feathersClient.service('media-trash').create({
      mediaType: 'image',
      model: 'students',
      subdocument: 'courses',
      field: 'image',
      public_id: '/v0001/avatar.jpg',
      courseId: 'abcd',
    });
    console.log('trash ', trash);
  } catch (err) {
    console.log('purge fail', err);
  }
}
