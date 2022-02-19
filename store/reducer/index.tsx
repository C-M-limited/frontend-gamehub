import { combineReducers } from 'redux';

import ConsoleBrandTypeReducer from './consoleBrandType';
import authReducer from './auth';
import userProfileReducer from './userProfile';

const allReducers = combineReducers({
    consoleBrand : ConsoleBrandTypeReducer,
    auth : authReducer,
    userProfile : userProfileReducer,

}) 
export default allReducers;

export type RootState = ReturnType<typeof allReducers>;
