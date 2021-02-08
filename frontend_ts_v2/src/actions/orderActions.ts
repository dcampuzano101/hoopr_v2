import axios from 'axios'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST
} from '../constants/orderConstants'
import { Dispatch } from 'redux'
import { UserLoginState } from '../reducers/userReducers'

export interface Order {
  totalPrice: number
  isPaid: boolean
  orderItems: [] | null
  paymentIntent: string
  user: string
}

export const createOrder = (order: Order) => async (
  dispatch: Dispatch,
  getState: () => UserLoginState
) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST
    })
    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    order.user = userInfo._id
    const { data } = await axios.post('/api/orders', order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getOrderDetails = (id: string) => async (
  dispatch: Dispatch,
  getState: () => UserLoginState
) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/api/orders/${id}`, config)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const payOrder = (orderId: string) => async (
  dispatch: Dispatch,
  getState: () => UserLoginState
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.put(`/api/orders/${orderId}/pay`, config)

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const listMyOrders = () => async (
  dispatch: Dispatch,
  getState: () => UserLoginState
) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST })
    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get('/api/orders/myorders', config)
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
