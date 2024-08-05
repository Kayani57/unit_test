

import {listAllUsers,filter,getPersonInactiveDuration,map,remindUsersBeforeDisablingTheAccount,disableUsers,deactivateUserFromFireStore} from "../src/function.js"


export const DeactivateInactivePersons = async (fs, pgToken) => {
    try {
      // Get a reference to the Firebase Authentication service
      const auth = admin.auth();
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const inactiveThreshold = 90 * millisecondsPerDay; // 90 days in milliseconds
      const reminderThreshold = 83 * millisecondsPerDay; // 83 days in milliseconds
  
      const now = Date.now();
      if (auth) {
  
        const { users, pageToken } = await listAllUsers(auth, pgToken);
  
  
        const enabledUsers = filter(users, user => !user.disabled);
  
  
        const inactiveUsers = filter(enabledUsers, (user) => {
          const inactiveDuration = getPersonInactiveDuration(user, now);
  
          return inactiveDuration > inactiveThreshold;
        });
  
        const inactivePersonId = [] = map(inactiveUsers, 'uid');
  
  
        const usersToRemind = filter(enabledUsers, (user) => {
          const inactiveDuration = getPersonInactiveDuration(user, now);
  
  
          return (
            (inactiveDuration > reminderThreshold) &&
            (inactiveDuration < (84 * millisecondsPerDay))
          );
        });
  
        const emailIdsToNotify = map(usersToRemind, 'email');
  
  
        const promises=[];
  
        promises.push(remindUsersBeforeDisablingTheAccount(fs, emailIdsToNotify));
  
  
        promises.push(disableUsers(auth, inactiveUsers));
        promises.push(deactivateUserFromFireStore(fs, inactivePersonIds));
  
        await Promise.all(promises);
        return { pageToken: pageToken ? pageToken : null };
      }
    } catch (error) {
  
      return { error, pageToken: null };
    }
  };