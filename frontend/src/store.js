import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userDetailsReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userListReducer,
  userUpdateReducer,
  userDeleteReducer,
  userUpdateProfilePhotoReducer,
} from "./reducers/userReducers";
import {
  runListReducer,
  runCreateReducer,
  runDeleteReducer,
  runDetailsReducer,
  runUpdateReducer,
} from "./reducers/runReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
} from "./reducers/orderReducers";
import { cartReducer } from "./reducers/cartReducers";
import { modalReducer } from "./reducers/modalReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  runCreate: runCreateReducer,
  runDetails: runDetailsReducer,
  runDelete: runDeleteReducer,
  runUpdate: runUpdateReducer,
  runList: runListReducer,
  cart: cartReducer,
  userUpdateProfilePhoto: userUpdateProfilePhotoReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderListMy: orderListMyReducer,
  modal: modalReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  cart: {
    cartItems: cartItemsFromStorage,
  },
};

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
