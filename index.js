const { paramsForServer } = require('feathers-hooks-common');
const { UserService } = require('./services');

const isNewUser = async () => {
  // Sign up - step 1 check for unique phone num
  // if true: twillio will send you sms with code
  try {
    const user = await UserService.find(
      paramsForServer({
        query: {
          phone: '96344902',
          countryCode: '852',
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

const createUser = async () => {
  try {
    const user = await UserService.create({
      phone: '96344902',
      countryCode: '852',
      verifyCode: '5952',
    });

    // Return Object
    // @Return - { total: 0, limit: 10, skip: 0, data: [] }
    console.log('User created: ', user);
  } catch (err) {
    console.log('err', err);
  }
};

const saveUserName = async (userId, name) => {
  try {
    const user = await UserService.patch(userId, { name });
    console.log('user updated: ', user);
  } catch (err) {
    console.log('err', err);
  }
};

// isNewUser();
// createUser();
saveUserName('5b42456bee82aa7aaa1b125f', 'Thomas Lia');
