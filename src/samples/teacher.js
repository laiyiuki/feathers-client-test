const teacher = {
  _id: "5b4c799d9fe23f8e70eabe8d",
  role: 'organization', // personal / organization
  organization: 'HK Tutors Ltd',
  // occupation: 'English teacher',
  video: 'link to video',
  educationLevel: 'Master Degree',
  school: 'HKU',
  // district: 'Central & Western District', // currently type String
  bio: 'I am good at traching',
  profession: 'Teaching',
  award: 'HK English Award 2018',
  timeslots: [{
    days: { type: [Number] },
    startTime: { type: String },
    endTime: { type: String },
  }],
  // timeTable: [], // not yet confirmed
  courses: [{
    _id: 'ObjectId',
    category: { type: String },
    title: { type: String, required: true },
    level: { type: Number, required: true, default: 1000 },
    image: { type: String },
    video: { type: String },
    description: { type: String },
    approvedBy: 'ObjectId',
    remark: '', // Staff use
    status: 'new', // pending, approved / rejected
    createdAt: 2018-07-16T10:55:25.048Z,
    updatedAt: 2018-07-17T08:39:35.813Z,
  }],
  locations: [{
    category: '',
    geo: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [] },
    },
    district: { type: String },
    street: { type: String },
    building: { type: String },
    block: { type: String },
    floor: { type: String },
    unit: { type: String },
  }],
  duration: 1, // Number: hours
  charge: 200, // Number
  acceptMultiStudent: true,
  additionalCostPerHead: 80, // Number: HKD
  notifications: ['newsletter', 'alert'],
  verifications: [{
    type: { type: String, require: true },
    file: { type: String },
    approvedBy: { type: Schema.Types.ObjectId },
    remark: { type: String },
    status: { type: String, require: true, default: 'pending' }, // pending, approved, rejected
    createdAt: 2018-07-16T10:55:25.048Z,
    updatedAt: 2018-07-17T08:39:35.813Z,
  }],
  status: 'active', // no default, e.g. show/ hide/ active / inactive / suspend
  userId: '5b4c799d9fe23f8e70eabe8d',
  user: {
    _id: '5b4c799d9fe23f8e70eabe8d',
    phone: '85296344902',
    phoneNumber: '96344902',
    countryCode: '852',
    email: 'thomaslai@manhldgs.com',
    password: '$2a$13$.hggJTugaMnT6jEUGvz9suU8EMlzfoJvXMIj5fqlqERXs3tblmKOa',
    facebookId: 'xxxxxxxxxx',
    name: 'John',
    avatar: 'https://linkToImage',
    birthday: 2018-07-17T03:12:57.217Z,
    gender: 'male'
    roles: [ 'teacher' ],
    permissions: [],
    status: 'new',
    createdAt: 2018-07-16T10:55:25.048Z,
    updatedAt: 2018-07-17T08:39:35.813Z,
  }
};
