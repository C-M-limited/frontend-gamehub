const initialState = false;

const isLogInReducer = (state = initialState, action: {type: string;}) =>{
    switch(action.type){
        case 'LogIN':
            return true
        case 'LogOut':
            return false
        default:
            return state;
    }
}

export default isLogInReducer;