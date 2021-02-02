import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_RESET,
  } from "../constants/cartConstants";
  import { Run } from '../actions/runActions'

 import { Action } from 'redux'
 interface ReduxAction extends Action {
	payload?: any
}
//import interfaceRUn
 export interface CartItem {
    run: string
    name: string
    price: number
    location: string
    date: string
    startTime: string
    endTime: string
    users: string
    waitList: string[]
 }

 export interface CartItems {
     cartItems: CartItem[]
 }

 const cartItems: CartItems = {
     cartItems: []
 }

  export const cartReducer = (state = cartItems, action: ReduxAction) => {
    switch (action.type) {
      case CART_ADD_ITEM:
        const item = action.payload;
  
        const existItem: CartItem | undefined = state.cartItems.find((cartItem: CartItem) => cartItem.run === item.run)
        
        if (existItem) {
            const { run } = existItem as CartItem
          return {
            ...state,
            cartItems: state.cartItems.map((cartItem: CartItem) =>
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
          cartItems: state.cartItems.filter((cartItem: CartItem) => cartItem.run !== action.payload),
        };
      case CART_RESET:
        localStorage.removeItem("cartItems");
        return { cartItems: [] };
      default:
        return state;
    }
  };
  