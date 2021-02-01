import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_REQUEST,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_RESET,
    ORDER_CREATE_RESET,
  } from "../constants/orderConstants";

import { Action } from 'redux'
interface ReduxAction extends Action {
    payload?: any
}

export const orderCreateReducer = (state = { success: false }, action: ReduxAction) => {
    switch (action.type) {
      case ORDER_CREATE_REQUEST:
        return {
          loading: true,
        };
      case ORDER_CREATE_SUCCESS:
        return {
          loading: false,
          success: true,
          order: action.payload,
        };
      case ORDER_CREATE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case ORDER_CREATE_RESET:
        return { success: false };
      default:
        return state;
    }
  };

  export const orderDetailsReducer = (
    state = { loading: true, orderItems: [], shippingAddress: {} },
    action: ReduxAction
  ) => {
    switch (action.type) {
      case ORDER_DETAILS_REQUEST:
        return {
          ...state,
        };
      case ORDER_DETAILS_SUCCESS:
        return {
          loading: false,
          order: action.payload,
        };
  
      case ORDER_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };