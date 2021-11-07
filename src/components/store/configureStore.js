import { createStore, combineReducers } from "redux";
import authReducer from "../reducers/authReducer";
import projectsReducer from "../reducers/projectsReducer";

export default () => {
const store = createStore(combineReducers({
    authReducer: authReducer,
    projectsReducer: projectsReducer
}))
return store;
}
    