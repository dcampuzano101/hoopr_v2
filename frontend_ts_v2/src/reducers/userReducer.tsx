import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS
} from '../constants/userConstants'

export interface Action {
  type: string
  payload?: any
}

export interface userListState {
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

export const userListReducer = (
  state: userListState = { loading: true },
  action: Action
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
