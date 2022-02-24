const initialState = "all";

const ConsoleBrandTypeReducer = (state = initialState, action: {type: string;}) =>{
    switch(action.type){
        case 'FilterAll':
            return 'all'
        case 'FilterPS':
            return 'playstation'
        case 'FilterNS':
                return 'nintendo'
        case 'FilterXbox':
            return 'xbox'
        default:
            return state;
    }
}

export default ConsoleBrandTypeReducer;