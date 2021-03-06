import { combineReducers } from "redux";

import { ingredientsReducer } from "./burger-ingredients";
import { ingredientDetailsReducer } from "./ingredient-details";
import { orderDetailsReducer } from "./order-details";
import { burgerConstructorReducer } from "./burger-constructor";
import { orderDataReducer } from "./order-data";
import { authReducer } from "./auth";
import { wsReducer } from "../reducers/wsReducer";

export const rootReducer = combineReducers({
  burgerIngredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  orderData: orderDataReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  authData: authReducer,
  ws: wsReducer,
});
