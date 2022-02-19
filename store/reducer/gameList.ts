interface actionProps{
    type: string,
    payload: any,
}
// const initialState = {
//     gameList: [],
// }
const initialState: any[] = [];
const gameListReducer = (state = initialState, action: actionProps) => {
    switch (action.type) {
        case "setGameList":
            return action.payload ;
        case "fetchGameList":
            return action.payload;
        default:
            return state;
    }
  };

export default gameListReducer;
  