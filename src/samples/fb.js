const fb ={
  credientials: {
    token: "EAADWZA0P77j0BAGoM3vaXUQc6BIqlyEz9aKt5lHzPYtGGdZAqklRZCGQjORo8MJbmUAGDRdJhp9Tsp7cZAfZB0UwQZBXpgtGcnRGpb2WdqDheNoR0ZBRGatnoV0M90DIzKSqjtGZBNKHXvZCtWStvSJkgBkUyUlCcFWDlTuRcZBXi5x75iMMRf94jTSnIP7VZCXBF1zsL13XQXfc6IltpmDdLt6orlj8SZABMZCIZD"
    tokenExpirationDate: "2018-09-18T16:09:50+08:00"
    userId: "10155579626096451"
    permissions: [
      'email', 'public_profile'
    ]
  }
  declinedPermissions: []
  missingPermissions: []
}



createAd({
     title: 'English Class',
     fee: 200,
     duration: 60,
   });
   
export const createAd = data => async () => {
 try {
   const ad = await CourseAdService.create(data);
   console.log(ad);
   return true;
 } catch (err) {
   console.log('err', err);
   return false;
 }
};
 Manhldgs is on a roll
Your team’s now 5 members strong, with 2069 messages sent across 2 channels. You can track your team’s progress via the main menu.

Show Me
Message Input

Message @Kelvin Lo
