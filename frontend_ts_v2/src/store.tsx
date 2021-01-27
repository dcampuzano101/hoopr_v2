import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import 

const reducer = combineReducers({
    userList: userListReducer,
})

const composeEnhancers = composeWithDevTools({
    trace: true,
    traceLimit: 25,
  });

const middleware = [thunk]

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware))
)

export default store