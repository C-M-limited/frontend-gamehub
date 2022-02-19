import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import allReducers from "./reducer";

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
  const composeEnhancers = typeof window != 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
const store = createStore(allReducers ,composeEnhancers(applyMiddleware(thunk)));

export default store