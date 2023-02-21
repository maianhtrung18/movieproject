import { combineReducers, createStore, applyMiddleware } from "redux";
import { loginReducer } from "./reducers/loginReducer";
import thunk from "redux-thunk"
import { movieReducer } from "./reducers/movieReducer";
import { phimReducer } from "./reducers/phimReducer";

const rootReducer = combineReducers({
    loginReducer,
    movieReducer,
    phimReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk))