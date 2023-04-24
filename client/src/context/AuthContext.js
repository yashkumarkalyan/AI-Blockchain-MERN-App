import { createContext ,useReducer} from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE={
     user:null,
    //  {  _id:"63b40ddea544ab7caf24ec11",
    //     username:"jane",
    //     email:"jane@gmail.com",
    //     profilePicutre:"",
    //     coverPicture:"",
    //     isAdmin:false,
    //     followers:[],
    //     followings:[1,2,3]
    // }
    
    isFetching:false,
    error:false
};

export const AuthContext=createContext(INITIAL_STATE);

export const AuthContextProvider=({children})=>{
    const [state,dispatch]= useReducer(AuthReducer,INITIAL_STATE);
    return(
        <AuthContext.Provider
        value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch,
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};