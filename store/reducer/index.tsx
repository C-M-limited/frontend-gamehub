import { combineReducers } from 'redux';

import ConsoleBrandTypeReducer from './consoleBrandType';
import isLogInReducer from './logIn';
import userProfileReducer from './userProfile';

const allReducers = combineReducers({
    consoleBrand : ConsoleBrandTypeReducer,
    isLogIn : isLogInReducer,
    userProfile : userProfileReducer,

}) 
export default allReducers;

export type RootState = ReturnType<typeof allReducers>;
