interface actionProps{
    type: string,
    payload: any,
}
// const initialState = {
//     gameList: [],
// }
const initialState ={
    loading: false,
    gameSalePostList: [],
    success: true,
};
const gameSalePostListReducer = (state = initialState, action: actionProps) => {
    switch (action.type) {
        case "fetchGameSalePostListRequest":
            return {...state, loading:true} ;
        case "fetchGameSalePostListSuccess":
            return {...state, loading:false, gameSalePostList: action.payload};
        case "fetchGameSalePostListFail":
            return {...state,loading: false, success: false}
        default:
            return state;
    }
  };

export default gameSalePostListReducer;
  