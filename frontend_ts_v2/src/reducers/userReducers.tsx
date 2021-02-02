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
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_UPDATE_PROFILE_PHOTO_REQUEST,
  USER_UPDATE_PROFILE_PHOTO_FAIL,
  USER_UPDATE_PROFILE_PHOTO_SUCCESS,
} from '../constants/userConstants'
import { Action } from 'redux'
import { User } from '../actions/userActions'

interface ReduxAction extends Action {
  payload?: any
}

export interface UserState {
  success?: boolean
  user?: User | {}
  loading?: boolean
  error?: string
}

const userState: UserState = {
  user: {},
  loading: false,
}
export interface UserListState extends UserState {
  users?: User[]
  next?: {
    page: number
    limit: number
  }
  previous?: {
    page: number
    limit: number
  }
}

export interface UserLoginState extends User {
  userLogin?: {} | any
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
      return state || null
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

export const userDetailsReducer = (state = userState, action: ReduxAction) => {
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

export const userUpdateProfileReducer = (state = userState, action: ReduxAction) => {
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

export const userDeleteReducer = (state = { loading: false }, action: ReduxAction) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userUpdateReducer = (state = userState, action: ReduxAction) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};

export const userUpdateProfilePhotoReducer = (state = userState, action: ReduxAction) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_PHOTO_REQUEST:
      return { loading: true, success: false };
    case USER_UPDATE_PROFILE_PHOTO_SUCCESS:
      return { loading: false, success: true, photoUrl: action.payload };
    case USER_UPDATE_PROFILE_PHOTO_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};