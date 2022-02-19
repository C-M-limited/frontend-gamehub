import axios from "axios"
import { server } from "../../config"

export const REGISTER_REQUEST = "REGISTER_REQUEST"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_FAILED = "REGISTER_FAILED"

export const registerRequest = () => {
    return {
        type: REGISTER_REQUEST
    }
}

export const registerSuccess = () => {
    return {
        type: REGISTER_SUCCESS
    }
}

export const registerFailed = () => {
    return {
        type: REGISTER_FAILED
    }
}

interface registerProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const registerThunk = ({ firstName, lastName, email, password}: registerProps) => {
    return (dispatch: any) => {
        dispatch(registerRequest())
        axios.post(`${server}/api/v1/registration`, {
            firstName,
            lastName,
            email,
            password
        })
        .then((res) => {
            alert(`Congrats ${firstName}! Register Success`)
            dispatch(registerSuccess())
        })
        .catch((err) => {
            alert("Register Failed")
            dispatch(registerFailed())
        })
    }
}