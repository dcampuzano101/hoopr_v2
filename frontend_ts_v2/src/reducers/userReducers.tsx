import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
} from '../constants/userConstants'
import { Action } from 'redux'
import { User } from '../actions/userActions'

interface ReduxAction extends Action {
  payload?: any
}

export interface UserDetailsState {
  success?: boolean
  user?: User
  loading?: boolean
}

export interface UserListState {
  loading: boolean
  users?: []
  next?: {
    page: number
    limit: number
  }
  previous?: {
    page: number
    limit: number
  }
}

export interface UserLoginState {
  loading?: boolean
  userLogin?: {
    userInfo?: {
      token?: string
    }
  }
}

export const userLoginReducer = (
  state: UserLoginState,
  action: ReduxAction
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}

    default:
      return state
  }
}

export const userListReducer = (
  state: UserListState = { loading: true },
  action: ReduxAction
) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload.users,
        next: action.payload.next ? action.payload.next : null,
        previous: action.payload.previous ? action.payload.previous : null
      }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userDetailsReducer = (state = {}, action: ReduxAction) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, success: true, user: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_RESET:
      return { loading: false, success: false }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action: ReduxAction) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

