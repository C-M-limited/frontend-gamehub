interface actionProps{
    type: string,
    payload: any,
}

const initialState ={
    logInWindow: false,
    registerWindow: false,

};
const popUpWindowReducer = (state = initialState, action: actionProps) => {
    switch (action.type) {
        case "setLogInWindow":
            return {...state, logInWindow:action.payload} ;
        case "setRegisterWindow":
            return {...state, registerWindow: action.payload};
        default:
            return state;
    }
  };

export default popUpWindowReducer;