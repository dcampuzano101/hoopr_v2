import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const addToCart = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const { data } = await axios.get(`/api/runs/${id}`, config);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      run: data._id,
      name: data.name,
      price: data.price,
      location: data.location,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      users: data.users,
      waitList: data.waitList,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
