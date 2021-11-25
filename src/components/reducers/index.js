import * as actionTypes from "../actions/types";
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import disablerReducer from "./disablerReducer";
import projectsReducer from "./projectReducer";
import glintHubSpaceReducer from "./glintHubSpaceReducer";
import glintHubSpaceFilterReducer from "./glintHubSpaceFilterReducer";


const initialErrorState = {
    serverError: false
}


const serverErrorReducer = (state = initialErrorState, action) => {
    switch (action.type) {
        case actionTypes.SET_SERVERERROR:
            return {
                ...state,
                serverError: true
            };
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    serverErrorReducer,
    userReducer,
    projectsReducer,
    disablerReducer,
    glintHubSpaceReducer,
    glintHubSpaceFilterReducer
});


export default rootReducer;
