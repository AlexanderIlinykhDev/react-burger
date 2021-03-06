import type { TwsActions } from "../actions/wsActionTypes";
import type { TOrderMessage, TOrders } from "../types/data";
import type { TOrderIngredientsActions } from "../actions/order-ingredients";

import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../constants/ws";

import {
  GET_ORDER_INFO_REQUEST,
  GET_ORDER_INFO_SUCCESS,
  GET_ORDER_INFO_ERROR,
} from "../constants/order-ingredients";

type TWState = {
  wsConnected: boolean;
  messages: Array<TOrderMessage>;
  orders: Array<TOrders>;
  modalOrder: TOrders | null;
  error?: any;
};
const wsInitialState: TWState = {
  wsConnected: false,
  messages: [],
  orders: [],
  modalOrder: null,
};

export const wsReducer = (
  state = wsInitialState,
  action: TwsActions | TOrderIngredientsActions
) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: true,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        messages: [],
        orders: [],
      };

    case WS_GET_MESSAGE:
      const parsedMessage = JSON.parse(action.payload);
      if (parsedMessage.orders.length)
        return {
          ...state,
          messages: [...state.messages, parsedMessage],
          orders: parsedMessage.orders,
        };
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case GET_ORDER_INFO_REQUEST:
      return {
        ...state,
      };
    case GET_ORDER_INFO_SUCCESS:
      return {
        ...state,
        modalOrder: action.payload.orders[0],
      };

    case GET_ORDER_INFO_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
};
