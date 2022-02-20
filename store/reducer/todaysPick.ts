import { string } from "yup/lib/locale"

const initialState = {
    gameList : [],
    loading :false,
}
interface actionProps{
    type: string,
    payload: any,
}

const todaysPickReducer = (state=initialState, action:actionProps) => {
    switch (action.type) {
        case "fetchTodayRequest":
            return {...state,loading : true} ;
        case "fetchTodaySuccess":
            return {...state,loading : false, gameList:action.payload};
        case "fetchTodayFailed":
            return {...state,loading : false}
        default:
            return state;
    }
}

export default todaysPickReducer;