import axios from 'axios'
import { Dispatch } from 'redux'
import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS
} from '../constants/userConstants'

export const listUsers = (page: number, limit: number) => async (
  dispatch: Dispatch
) => {
  console.log('hello')
  debugger
  try {
    dispatch({
      type: USER_LIST_REQUEST
    })
    debugger
    const { data } = await axios.get(`/api/users?page=${page}&limit=${limit}`)
    debugger
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
