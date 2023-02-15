import { combineReducers, createStore, applyMiddleware } from "redux";
import { loginReducer } from "./reducers/loginReducer";
import thunk from "redux-thunk"
import { movieReducer } from "./reducers/movieReducer";
const rootReducer = combineReducers({
    loginReducer,
    movieReducer
})

 export const store = createStore(rootReducer,applyMiddleware(thunk))