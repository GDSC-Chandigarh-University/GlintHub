import * as actionTypes from "../actions/types";
import { combineReducers } from "redux";

const initialUserState = {
    isLoading: true,
    user: null,
};

const user_reducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                user: action.payload.user,
                isLoading: false,
            };
        case actionTypes.CLEAR_USER:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

const initialProjectsState = {
    isLoading: true,
    publishedApps: [],
    draftedApps: [],
    reviewApps: [],
};

const projects_reducer = (state = initialProjectsState, action) => {
    switch (action.type) {
        case actionTypes.APPS_INIT:
            return {
                ...state,
                publishedApps: [],
                draftedApps: [],
                reviewApps: [],
            };
        case actionTypes.SET_PUBLISHEDAPP:
            return {
                ...state,
                publishedApps: [...state.publishedApps, action.payload.app],
            };
        case actionTypes.SET_REVIEWAPP:
            return {
                ...state,
                reviewApps: [...state.reviewApps, action.payload.app],
            };
        case actionTypes.SET_DRAFTEDAPP:
            return {
                ...state,
                draftedApps: [...state.draftedApps, action.payload.app],
            };
        case actionTypes.APPS_LOADED:
            return {
                ...state,
                isLoading: false,
            };
        case actionTypes.UPDATE_APP:
            if (action.payload.app.isPublished) {
                const updatedApps = state.publishedApps.map((app) => {
                    if (app.id == action.payload.app.id) {
                        console.log({ ...app, ...action.payload.data });
                        return { ...app, ...action.payload.data };
                    } else {
                        return { ...app }
                    }
                });
                localStorage.setItem("publishedApps", JSON.stringify(updatedApps))
                return {
                    ...state,
                    publishedApps: [...updatedApps]
                }
            } else if (action.payload.app.isDrafted) {
                const updatedApps = state.draftedApps.map((app) => {
                    if (app.id == action.payload.app.id) {
                        console.log({ ...app, ...action.payload.data });
                        return { ...app, ...action.payload.data };
                    } else {
                        return { ...app }
                    }
                });
                localStorage.setItem("draftedApps", JSON.stringify(updatedApps))
                return {
                    ...state,
                    draftedApps: [...updatedApps]
                }
            } else if (action.payload.app.inReview) {
                const updatedApps = state.reviewApps.map((app) => {
                    if (app.id == action.payload.app.id) {
                        console.log({ ...app, ...action.payload.data });
                        return { ...app, ...action.payload.data };
                    } else {
                        return { ...app }
                    }
                });
                localStorage.setItem("reviewApps", JSON.stringify(updatedApps))
                return {
                    ...state,
                    reviewApps: [...updatedApps]
                }
            }
        case actionTypes.DELETE_APP:
            if (action.payload.app.isPublished) {
                const updatedApps = state.publishedApps.filter((app) => {
                    return app.id !== action.payload.app.id
                });
                localStorage.setItem("publishedApps", JSON.stringify(updatedApps))
                return {
                    ...state,
                    publishedApps: [...updatedApps]
                }
            } else if (action.payload.app.isDrafted) {
                const updatedApps = state.draftedApps.filter((app) => {
                    return app.id !== action.payload.app.id
                });
                localStorage.setItem("draftedApps", JSON.stringify(updatedApps))
                return {
                    ...state,
                    draftedApps: [...updatedApps]
                }
            } else if (action.payload.app.inReview) {
                const updatedApps = state.reviewApps.filter((app) => {
                    return app.id !== action.payload.app.id
                });
                localStorage.setItem("reviewApps", JSON.stringify(updatedApps))
                return {
                    ...state,
                    reviewApps: [...updatedApps]
                }
            }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    user_reducer: user_reducer,
    projects_reducer: projects_reducer,
});

export default rootReducer;
