

const verificationApproval = async () => {
  try {
    const approve = await feathersClient.service('teachers').patch(
      '5b97512673f8bb00150bc590',
      {
        verifications: [{
            "status" : "approved",
            "_id" : ObjectId("5b98a8874b7e200015190355"),
            "type" : "id",
            "image" : "v1536731270/apps/staging/teachers/verifications/dobfkim9t7jo4rwfn3wx"
        }]
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
