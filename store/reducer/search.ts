interface actionProps{
    type: string,
    payload: any,
}

const initialState ={
    loading: false,
    searchList: [],
    success: true,

};

const searchListReducer = (state = initialState, action: actionProps) => {
    switch (action.type) {
        case "fetchSearchListRequest":
            return {...state, loading:true} ;
        case "fetchSearchListSuccess":
            return {...state, loading:false, searchList: action.payload};
        case "fetchSearchListFail":
            return {...state,loading: false, success: false}
        default:
            return state;
    }
  };

export default searchListReducer;