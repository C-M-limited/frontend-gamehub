import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILED, LOG_OUT_SUCCESS } from './../action/auth';
import jwt_decode, { JwtPayload } from "jwt-decode";

let username;
let imageKey;
interface decodeJWTProps {
    email: string;
    id: number;
    exp: number;
    imageKey: string;
    name: string;
    role: string | null;
}

if (typeof window !== 'undefined') {
    let auth = localStorage.getItem('access-token')
    if (auth) {
        username = jwt_decode<decodeJWTProps>(auth).name 
        imageKey = jwt_decode<decodeJWTProps>(auth).imageKey 
    }
}

interface stateProps {
    loading?: boolean;
    isLogin?: boolean;
    username?: string;
    imageKey?: string;
    error?: boolean;
    errMsg?: string;
}

const initialState: stateProps = username ? {
    loading: false,
    username,
    imageKey: `/user_icon/${imageKey}.jpg`,
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
            return {}
        default:
            return state
    }
}

export default authReducer;