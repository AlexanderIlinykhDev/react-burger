import { compose, createStore, applyMiddleware } from "redux";
import { socketMiddleware } from "./middleware/socketMiddleware";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/index";
import { wsThunkActions } from "./actions/wsActionTypes";
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsThunkActions))
);
export const store = createStore(rootReducer, enhancer);

///*?token=${getCookie("acessToken")