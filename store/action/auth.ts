import axios from "axios"
import { server } from '../../config'
import jwt from 'jwt-decode';
import { setUserProfileAction } from "./userPorfile";
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

interface userProfileProps{
    role  : string;
    id    : number;
    email : string;
    name  : string;
    imageKey: string;
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
            const token:string=localStorage.getItem("access-token") || "";
            const user:userProfileProps = jwt(token);
            dispatch(setUserProfileAction({name: user.name, role: user.role, email: user.email, id :user.id, imageKey: `/user_icon/${user.imageKey}.jpg`}))
            // localStorage.setItem('login', String(user.name))
            alert('Login Success')
            // window.location.reload()
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
        const refreshTokenCopy= localStorage.getItem('refresh-token');
        const headers:any = { 
            'refreshToken': refreshTokenCopy,
          };
        console.log('logout')
        axios.post(`${server}/api/v1/logOut`, {}, { headers }).then((res)=>{
            localStorage.removeItem('access-token')
            localStorage.removeItem('refresh-token');
            localStorage.removeItem('login')
            dispatch(logOutSuccess());
        })
        .catch((err)=>{
            console.log(err.response)
        })

    }
}

// // export const register = () => {
// //     return async (dispatch: any) => {

//     }
// }