import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED } from './../action/registration';

let initialState = {
    loading: false,
}

export const registerReducer = (state=initialState, action) => {
    switch(action.type) {
        case REGISTER_REQUEST:
            return {
                ...initialState,
                loading: true
            }
        
        case REGISTER_SUCCESS:
            return {
                ...initialState,
                loading: false
            }

        case REGISTER_FAILED:
            return {}
        
        default:
            return state
    }
}

