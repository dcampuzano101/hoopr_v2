import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET,
} from '../constants/cartConstants';
// import { Run } from '../admin/components/Runs'

//  import { Action } from 'redux'
//  interface ReduxAction extends Action {
// 	payload?: any
// }
//import interfaceRUn
//  export interface CartItem {
//     run: string
//     name: string
//     price: number
//     location: string
//     date: string
//     startTime: string
//     endTime: string
//     users: string
//     waitList: string[]
//  }

//  export interface CartItems {
//      cartItems: CartItem[]
//  }

const cartItems = {
  cartItems: [],
};

export const cartReducer = (state = cartItems, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find(
        (cartItem) => cartItem.run === item.run
      );

      if (existItem) {
        const { run } = existItem;
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.run === run ? item : cartItem
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.run !== action.payload
        ),
      };
    case CART_RESET:
      localStorage.removeItem('cartItems');
      return { cartItems: [] };
    default:
      return state;
  }
};
