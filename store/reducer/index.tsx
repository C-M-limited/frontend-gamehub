import { combineReducers } from 'redux';

import ConsoleBrandTypeReducer from './consoleBrandType';
import authReducer from './auth';
import userProfileReducer from './userProfile';
import  gameListReducer  from './gameList';
import { registerReducer } from './registration';
import todaysPickReducer from './todaysPick';

const allReducers = combineReducers({
    consoleBrand : ConsoleBrandTypeReducer,
    auth : authReducer,
    userProfile : userProfileReducer,
    gameList : gameListReducer,
    register: registerReducer,
    todaysPick : todaysPickReducer,

}) 
export default allReducers;

export type RootState = ReturnType<typeof allReducers>;
