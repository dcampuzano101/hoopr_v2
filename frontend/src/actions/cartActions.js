import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_RESET,
} from "../constants/cartConstants";

export const addToCart = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/runs/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      run: data._id,
      name: data.name,
      price: data.price,
      location: data.location,
      date: data.date,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
