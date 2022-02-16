import { combineReducers } from 'redux';

import ConsoleBrandTypeReducer from './consoleBrandType';

const allReducers = combineReducers({
    consoleBrand : ConsoleBrandTypeReducer,
}) 
export default allReducers;

export type RootState = ReturnType<typeof allReducers>;
