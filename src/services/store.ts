import { compose, createStore, applyMiddleware } from "redux";
import { socketMiddleware } from "./middleware/socketMiddleware";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/index";
import { getCookie } from "../utils/cookies";
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(
      `wss://norma.nomoreparties.space/orders/all`
    )
  )
);
export const store = createStore(rootReducer, enhancer);

///*?token=${getCookie("acessToken")