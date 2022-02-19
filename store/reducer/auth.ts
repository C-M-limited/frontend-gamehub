import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILED } from './../action/auth';

interface logInStateProps {
    loading: boolean;
    isLogin: boolean;
    error: boolean;
    errMsg: string;
}

const initialState: logInStateProps = {
    loading: false,
    isLogin: false,
    error: false,
    errMsg: "",
};

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
            return {
                ...initialState,
                loading: false,
                isLogin: false,
                error: true,
                errMsg: action.payload
            }
        default:
            return state
    }
}

export default authReducer;