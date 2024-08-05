const logInfo = (message)=>{
    console.log(message)
}
const logError = (message)=>{
    console.error(message)
}


export const listAllUsers = (auth,pgToken)=>{
    logInfo("List of all Users with pgToken:"+pgToken)
    return{ users:{id:'user1',disabled:false,email:"forexample@gmail.com"}}
    
}
export const filter=(users,callback)=>{
    logInfo("Filtering Users")
    return callback(users)
}

export  const getPersonInactiveDuration=()=>
{
    logInfo("Getting Person Inactive Duration")
    return 90*24 * 60 * 60 * 1000;
}
export  const map=(InactiveUsers,key)=>{
    logInfo("Mapping Inactive Users")
    return map.users()
}

export  const remindUsersBeforeDisablingTheAccount=(fs,emailIds)=>{
    logInfo("Reminding Users Before Disabling Account"+emailIds.join(','))
    return true
}

export  const disableUsers=(auth,InactiveUsers)=>{
    logInfo("Disabling Users")
    return true
}
export  const deactivateUserFromFireStore=(fs, inactivePersonIds)=>{
    logInfo("Deactivating User from Firestore")
    return true
}
  