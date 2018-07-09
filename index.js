const { paramsForServer } = require('feathers-hooks-common');
const { UserService } = require('./services');
const axios = require('axios');

//

const isNewUser = async (phoneNumber, countryCode) => {
  // Sign up - step 1 check for unique phone num
  // if true: twillio will send you sms with code
  try {
    const user = await UserService.find(
      paramsForServer({
        query: {
          phoneNumber,
          countryCode,
        },
        action: 'sign-up',
      }),
    );

    // Return Object
    // @Return - { total: 0, limit: 10, skip: 0, data: [] }
    if (user.total > 0) {
      console.log('user already exists', user.data);
    } else {
      console.log('This is a new user');
    }
  } catch (err) {
    console.log('err', err);
  }
};

//

const verifyPhone = async (phoneNumber, countryCode, verifyCode) => {
  try {
    const res = await axios.post('http://localhost:3030/verify-phone', {
      phoneNumber,
      countryCode,
      verifyCode,
    });
    console.log('verify response', res.data);
  } catch (err) {
    console.log(err);
  }
};

//

const createUser = async (phoneNumber, countryCode, name, password) => {
  try {
    const user = await UserService.create({
      phoneNumber,
      countryCode,
      name,
      password,
      roles: ['teacher'],
    });

    // Return Object
    // @Return - { total: 0, limit: 10, skip: 0, data: [] }
    console.log('User created: ', user);
  } catch (err) {
    console.log('err', err);
  }
};

//

const saveUserName = async (userId, name) => {
  try {
    const user = await UserService.patch(userId, { name });
    console.log('user updated: ', user);
  } catch (err) {
    console.log('err', err);
  }
};

// isNewUser('96344902', '852');
// verifyPhone('96344902', '852', '1196');
createUser('96344902', '852', 'Thomas', 'abcd');
// saveUserName('5b42456bee82aa7aaa1b125f', 'Thomas Lia');
