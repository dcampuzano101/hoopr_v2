import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  userListReducer,
  UserListState,
  userLoginReducer
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
  // userLogin: userLoginReducer
  // userRegister: userRegisterReducer,
  // userDetails: userDetailsReducer,
  // userUpdateProfile: userUpdateProfileReducer,
  // userUpdate: userUpdateReducer,
  // userDelete: userDeleteReducer
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
