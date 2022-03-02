// const initialState = {
//     content: []
// };

const initialState: any =[];

interface actionProps {
    type: string;
    payload: any;
  }

const userProfileReducer = (state = initialState, action: actionProps) =>{
    switch(action.type){
        case 'setUserProfile':
            return action.payload;
        default:
            return state;
    }
}

export default userProfileReducer;