import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  userListReducer, userLoginReducer, UserListState, userDetailsReducer, userDeleteReducer,
  userUpdateReducer, userUpdateProfilePhotoReducer, userUpdateProfileReducer
} from './reducers/userReducers'


interface InitialState {
  userLogin?: {} | any
  userList?: UserListState | any
}

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem('userInfo') || '{}') : null

const reducer = combineReducers({
  userList: userListReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdateProfilePhoto: userUpdateProfilePhotoReducer,

})

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25
})

const middleware = [thunk]

const initialState: InitialState = {
  userLogin: {} || userInfoFromStorage,

}

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
)

export default store
