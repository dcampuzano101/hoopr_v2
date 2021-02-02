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
import { Order } from '../actions/orderActions'

interface ReduxAction extends Action {
  payload?: any
}

export interface OrderState {
  success?: boolean
  order?: Order | {}
  loading?: boolean
  error?: string
}

export interface OrderListState extends OrderState {
  orders?: {}
  next?: {
    page: number
    limit: number
  }
  previous?: {
    page: number
    limit: number
  }
}

const orderState: OrderState = {
  loading: false,
  order: {}
}

const orderListState: OrderListState = {
  loading: false,
  orders: {},
  next: {
    page: 2,
    limit: 4
  }
}

export const orderCreateReducer = (state = orderState, action: ReduxAction) => {
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
  state = orderState,
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

export const orderListMyReducer = (state = orderListState, action: ReduxAction) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      };

    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_LIST_MY_RESET:
      return {
        orders: [],
      };
    default:
      return state;
  }
};