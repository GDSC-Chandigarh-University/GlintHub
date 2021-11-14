import * as actionTypes from "../actions/types";
import { combineReducers } from "redux";

const initialUserState = {
    isLoading: true,
    user: null
}

const user_reducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                user: action.payload.user,
                isLoading: false
            }
        case actionTypes.CLEAR_USER:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

const initialProjectsState = {
    isLoading: true,
    publishedApps: [],
    draftedApps: [],
    reviewApps: []
}

const projects_reducer = (state = initialProjectsState, action) => {
    switch (action.type) {
        case actionTypes.APPS_INIT:
            return {
                ...state,
                publishedApps: [],
                draftedApps: [],
                reviewApps: []
            }
        case actionTypes.SET_PUBLISHEDAPP:
            return {
                ...state,
                publishedApps: [
                    ...state.publishedApps,
                    action.payload.app
                ]
            }
        case actionTypes.SET_REVIEWAPP:
            return {
                ...state,
                reviewApps: [
                    ...state.reviewApps,
                    action.payload.app
                ]
            }
        case actionTypes.SET_DRAFTEDAPP:
            return {
                ...state,
                draftedApps: [
                    ...state.draftedApps,
                    action.payload.app
                ]
            }
        case actionTypes.APPS_LOADED:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user_reducer: user_reducer,
    projects_reducer: projects_reducer
})

export default rootReducer