interface PopUpProps{
    functionType : String,
    status : boolean
}

export const setLogInWindowAction =(isOpen: boolean)=>{
    type: 'setLogInWindow'
    payload: isOpen
}

export const setRegisterWindowAction =(isOpen: boolean)=>{
    type: 'setRegisterWindow'
    payload: isOpen
}

export const setPopUpWindowThunk = ({functionType, status}: PopUpProps)=>{
    return (dispatch: any) => {
        if (functionType==='logIn'){
            dispatch(setLogInWindowAction(status))
        }else if (functionType==='logOut'){
            dispatch(setRegisterWindowAction(status))
        }
    }
};