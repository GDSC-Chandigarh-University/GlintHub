import { createStore, combineReducers } from "redux";
import authReducer from "../reducers/authReducer";

export default () => {
const store = createStore(combineReducers({
    authReducer: authReducer
}))
return store;
}
    