import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED } from './../action/registration';

interface stateProps {
    loading: boolean;
}

let initialState: stateProps = {
    loading: false,
}

export const registerReducer = (state=initialState, action: any) => {
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

