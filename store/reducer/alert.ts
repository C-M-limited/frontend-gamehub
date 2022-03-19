interface actionProps{
    type: string,
    payload: any,
}
const initialState ={
    isOpen: false,
    type : "",
    content: "",

};

const alertReducer = (state = initialState, action: actionProps) => {
    switch (action.type) {
        case "OpenAlert":
            return {...state, isOpen: true, type: action.payload.type, content: action.payload.content} ;
        case "CloseAlert":
            return {...state, isOpen: false};
        default:
            return state;
    }
  };

export default alertReducer;