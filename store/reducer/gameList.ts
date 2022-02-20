interface actionProps{
    type: string,
    payload: any,
}
// const initialState = {
//     gameList: [],
// }
const initialState ={
    loading: false,
    gameList: [],
    success: true,

};
const gameListReducer = (state = initialState, action: actionProps) => {
    switch (action.type) {
        case "fetchGameListRequest":
            return {...state, loading:true} ;
        case "fetchGameListSuccess":
            return {...state, loading:false, gameList: action.payload};
        case "fetchGameListFail":
            return {...state,loading: false, success: true}
        default:
            return state;
    }
  };

export default gameListReducer;
  