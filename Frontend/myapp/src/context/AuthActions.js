export const LoginStart = (userCredentials)=>({
    type:"LOGIN_START"
})

export const LoginSuccess = (user)=>({
    type:"LOGIN_SUCCESS",
    payload: user
})

export const LoginFailure = (error)=>({
    type:"LOGIN_FAILURE",
    payload:error
})

export const Follow = (userId)=>({
    type:"FOLLOW",
    payload:userId
})

export const Unfollow = (userId)=>({
    type:"UNFOLLOW",
    payload:userId
})


export const setSessionData = (data) => {
    // localStorage.setItem('sessionData', JSON.stringify(data));
    sessionStorage.setItem('sessionData', JSON.stringify(data));
    console.log("POSTAVI PODATKE")
    return {
      type: 'SET_SESSION_DATA',
      payload: data
    };
  };