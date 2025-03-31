import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer"
// const item_value = sessionStorage.getItem("sessionData");

const sessionData = sessionStorage.getItem("sessionData");//uzimamo usera iz sesije
let user = null;

if (sessionData) {
  try {
    user = JSON.parse(sessionData);
  } catch (error) {
    console.error("Error parsing session data:", error);
  }
}

const INITIAL_STATE = {
    user:user,
    isFetching:false,
    error:false
}

export const AuthContext = createContext(INITIAL_STATE)


export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    return(
        <AuthContext.Provider value={{user:state.user, isFetching:state.isFetching, error:state.error, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}