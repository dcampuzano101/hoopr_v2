import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  userListReducer,
} from './reducers/userReducers'

interface UserInfo {
  userInfo: string
}

interface InitialState {
  // userLogin?: {
  //   userInfo: any
  // }
  // userList?: UserListState
}

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const reducer = combineReducers({
  userList: userListReducer
})

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25
})

const middleware = [thunk]

const initialState: InitialState = {
  // userLogin: { userInfo: userInfoFromStorage }
  userList: null
}

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
)

export default store
