import { combineReducers } from 'redux';

import ConsoleBrandTypeReducer from './consoleBrandType';
import userProfileReducer from './userProfile';
import  gameListReducer  from './gameList';
import todaysPickReducer from './todaysPick';
import searchListReducer from './search';
import popUpWindowReducer from './popUpWindow';
import authReducer from './auth';
import {registerReducer} from './registration';
import gameSalePostListReducer from './gameSalePost';
import alertReducer from './alert';

const allReducers = combineReducers({
    consoleBrand : ConsoleBrandTypeReducer,
    auth : authReducer,
    userProfile : userProfileReducer,
    gameList : gameListReducer,
    gameSalePostList: gameSalePostListReducer,
    register: registerReducer,
    todaysPick : todaysPickReducer,
    searchList: searchListReducer,
    popUpWindow: popUpWindowReducer,
    alertRedux : alertReducer,

}) 
export default allReducers;

export type RootState = ReturnType<typeof allReducers>;
