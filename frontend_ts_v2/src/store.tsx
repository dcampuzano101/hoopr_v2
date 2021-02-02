import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  userListReducer,
  userLoginReducer,
  userDetailsReducer,
  userDeleteReducer,
  userUpdateReducer,
  userUpdateProfilePhotoReducer,
  userUpdateProfileReducer
} from './reducers/userReducers'

import {
  runCreateReducer,
  runListReducer,
  runDetailsReducer,
  runUpdateReducer,
  runDeleteReducer
} from './reducers/runReducers'


interface InitialState {
  userLogin?: {} | any
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
  runList: runListReducer,
  runCreate: runCreateReducer,
  runDetails: runDetailsReducer,
  runUpdate: runUpdateReducer,
  runDelete: runDeleteReducer

})

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25
})

const middleware = [thunk]

const initialState: InitialState = {
  userLogin: {
    userInfo: {}
  } || userInfoFromStorage,

}

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
)

export default store
