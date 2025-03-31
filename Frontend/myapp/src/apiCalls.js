import axios from "axios"
import { setSessionData } from "./context/AuthActions"

export const loginCall = async (userCredentials, dispatch) => {

    dispatch({type:"LOGIN_START"})
    try {
        const res = await axios.post("auth/login", userCredentials)
        dispatch({type:"LOGIN_SUCCESS", payload:res.data})
        // const sessionData = { key: 'value' };
        // dispatch({type:"SET_SESSION_DATA", sessionData})
        const sessionData = { key: 'value' };
    dispatch(setSessionData(res.data));
        console.log("Uspesan login")
    } catch (err) {
        dispatch({type:"LOGIN_FAILURE", payload:err})
        console.log("Neuspesan login")
        alert(`Neuspesan login, pokusajte ponovo.`)
    }
}