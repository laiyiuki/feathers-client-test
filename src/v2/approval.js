

const verificationApproval = async () => {
  try {
    const approve = await feathersClient.service('teachers').patch(
      '5b97512673f8bb00150bc590',
      {
        // set status
      },
      paramsForServer({
        query: {},
        action: 'verification-approval',
        subdocumentId: '5b98a8874b7e200015190355',
      }),
    );
    console.log('approve', approve);
  } catch (err) {
    console.log('err' err);
  }
 }
