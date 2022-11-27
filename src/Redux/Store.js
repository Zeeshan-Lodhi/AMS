import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { userDataReducer, userLoginReducer } from "./Reducers/userData";

const reducer = combineReducers({
    userData: userDataReducer,
    userLogin: userLoginReducer
});


// const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store;
