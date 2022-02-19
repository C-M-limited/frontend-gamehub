import { combineReducers } from 'redux';

import ConsoleBrandTypeReducer from './consoleBrandType';
import authReducer from './auth';
import userProfileReducer from './userProfile';
import  gameListReducer  from './gameList';

const allReducers = combineReducers({
    consoleBrand : ConsoleBrandTypeReducer,
    auth : authReducer,
    userProfile : userProfileReducer,
    gameList : gameListReducer

}) 
export default allReducers;

export type RootState = ReturnType<typeof allReducers>;
