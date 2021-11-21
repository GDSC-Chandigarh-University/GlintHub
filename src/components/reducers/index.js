import { combineReducers } from "redux";
import userReducer from "./userReducer";
import disablerReducer from "./disablerReducer";
import projectsReducer from "./projectReducer";


const rootReducer = combineReducers({
    userReducer,
    projectsReducer,
    disablerReducer
});


export default rootReducer;
