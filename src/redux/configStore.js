import { combineReducers, createStore, applyMiddleware } from "redux";
import { loginReducer } from "./reducers/loginReducer";
import thunk from "redux-thunk"
const rootReducer = combineReducers({
    loginReducer,

})

 export const store = createStore(rootReducer,applyMiddleware(thunk))