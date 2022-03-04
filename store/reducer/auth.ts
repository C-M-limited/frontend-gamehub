import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILED, LOG_OUT_SUCCESS } from './../action/auth';

let auth;

if (typeof window !== 'undefined') {
    auth = localStorage.getItem('login')
}

interface stateProps {
    loading?: boolean;
    isLogin?: boolean;
    username?: string;
    error?: boolean;
    errMsg?: string;
}

const initialState: stateProps = auth ? {
    loading: false,
    isLogin: false,
    username: auth,
    error: false,
    errMsg: "",
} : {}

const authReducer = (state = initialState, action: {type: string; payload?: string}) =>{
    switch(action.type){
        case LOG_IN_REQUEST:
            return {
                ...initialState,
                loading: true
            }
        case LOG_IN_SUCCESS:
            return {
                ...initialState,
                loading: false,
                isLogin: true,
            }
        case LOG_IN_FAILED:
            return {}
        case LOG_OUT_SUCCESS:
            return {...initialState,isLogin:false}
        default:
            return state
    }
}

export default authReducer;