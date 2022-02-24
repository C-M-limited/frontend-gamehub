import axios from "axios"
import { server } from '../../config'
export const LOG_IN_REQUEST = "LOG_IN_REQUEST"
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS"
export const LOG_IN_FAILED = "LOG_IN_FAILED"
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST"
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS"
export const LOG_OUT_FAILED = "LOG_OUT_FAILED"

export const logInRequest = () => {
    return {
        type: LOG_IN_REQUEST
    }
}

export const logInSuccess = () => {
    return {
        type: LOG_IN_SUCCESS
    }
}

export const logInFailed = (errMsg: string) => {
    return {
        type: LOG_IN_FAILED,
        payload: errMsg
    }
}

export const logOutRequest = () => {
    return {
        type: LOG_OUT_REQUEST
    }
}

export const logOutSuccess = () => {
    return {
        type: LOG_OUT_SUCCESS
    }
}

export const logOutFailed = (errMsg: string) => {
    return {
        type: LOG_OUT_FAILED,
        payload: errMsg
    }
}

interface logInProps {
    email: string;
    password: string;
}

export const login = ({ email, password }: logInProps) => {
    return async (dispatch: any) => {
        dispatch(logInRequest())

        axios.post(`${server}/api/v1/login`, {
            email,
            password
          })
          .then(function (response){
            if (response.data==="This account is already LogIn"){
              dispatch(logInFailed(response.data))
              alert('Login Failed')
              return;
            }
            localStorage.setItem('access-token',response.data.AUTHORIZATION);
            localStorage.setItem('refresh-token',response.data.refreshToken);
            dispatch(logInSuccess());
            alert('Login Success')
          })
          .catch(function (error){
            dispatch(logInFailed("Login Failed"));
            alert('Login Failed')
            console.log(error.response)
          })
    }
}


export const logOut = () => {
    return async (dispatch: any) => {

    }
}

export const register = () => {
    return async (dispatch: any) => {

    }
}