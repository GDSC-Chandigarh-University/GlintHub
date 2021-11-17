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
    publishedProjects: [],
    draftedProjects: [],
    reviewProjects: [],
};

const projects_reducer = (state = initialProjectsState, action) => {
    switch (action.type) {
        case actionTypes.SET_PUBLISHEDPROJECT:
            return {
                ...state,
                publishedProjects: [...state.publishedProjects, action.payload.projectData],
            };
        case actionTypes.SET_REVIEWPROJECT:
            return {
                ...state,
                reviewProjects: [...state.reviewProjects, action.payload.projectData],
            };
        case actionTypes.SET_DRAFTEDPROJECT:
            return {
                ...state,
                draftedProjects: [...state.draftedProjects, action.payload.projectData],
            };
        case actionTypes.PROJECTS_LOADED:
            return {
                ...state,
                isLoading: false,
            };
        case actionTypes.UPDATE_PROJECT:
            if (action.payload.project.projectStatus === "isPublished") {
                const updatedProjects = state.publishedProjects.map((project) => {
                    if (project.id == action.payload.project.id) {
                        console.log({ ...project, ...action.payload.projectData });
                        return { ...project, ...action.payload.projectData };
                    } else {
                        return { ...project }
                    }
                });
                localStorage.setItem("publishedProjects", JSON.stringify(updatedProjects))
                return {
                    ...state,
                    publishedProjects: [...updatedProjects]
                }
            } else if (action.payload.project.projectStatus === "isDrafted") {
                const updatedProjects = state.draftedProjects.map((project) => {
                    if (project.id == action.payload.project.id) {
                        console.log({ ...project, ...action.payload.projectData });
                        return { ...project, ...action.payload.projectData };
                    } else {
                        return { ...project }
                    }
                });
                localStorage.setItem("draftedProjects", JSON.stringify(updatedProjects))
                return {
                    ...state,
                    draftedProjects: [...updatedProjects]
                }
            } else if (action.payload.project.projectStatus === "inReview") {
                const updatedProjects = state.reviewProjects.map((project) => {
                    if (project.id == action.payload.project.id) {
                        console.log({ ...project, ...action.payload.projectData });
                        return { ...project, ...action.payload.projectData };
                    } else {
                        return { ...project }
                    }
                });
                localStorage.setItem("reviewProjects", JSON.stringify(updatedProjects))
                return {
                    ...state,
                    reviewProjects: [...updatedProjects]
                }
            }
        case actionTypes.DELETE_PROJECT:
            if (action.payload.project.projectStatus == "isPublished") {
                const updatedProjects = state.publishedProjects.filter((project) => {
                    return project.id !== action.payload.project.id
                });
                localStorage.setItem("publishedProjects", JSON.stringify(updatedProjects))
                return {
                    ...state,
                    publishedProjects: [...updatedProjects]
                }
            } else if (action.payload.project.projectStatus == "isDrafted") {
                const updatedProjects = state.draftedProjects.filter((project) => {
                    return project.id !== action.payload.project.id
                });
                localStorage.setItem("draftedProjects", JSON.stringify(updatedProjects))
                return {
                    ...state,
                    draftedProjects: [...updatedProjects]
                }
            } else if (action.payload.project.projectStatus == "inReview") {
                const updatedProjects = state.reviewProjects.filter((project) => {
                    return project.id !== action.payload.project.id
                });
                localStorage.setItem("reviewProjects", JSON.stringify(updatedProjects))
                return {
                    ...state,
                    reviewProjects: [...updatedProjects]
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
