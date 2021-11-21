import * as actionTypes from "../actions/types";


const initialProjectsState = {
    isLoading: true,
    publishedProjects: [],
    draftedProjects: [],
    reviewProjects: [],
};


const projectsReducer = (state = initialProjectsState, action) => {
    switch (action.type) {
        case actionTypes.PROJECTS_INIT:
            return {
                ...state,
                publishedProjects: [],
                draftedProjects: [],
                reviewProjects: [],
            };
        case actionTypes.SET_PUBLISHEDPROJECT:
            var storedPublishedProjects = JSON.parse(localStorage.getItem("publishedProjects"));
            storedPublishedProjects.unshift(action.payload.projectData);
            localStorage.setItem("publishedProjects", JSON.stringify(storedPublishedProjects));
            return {
                ...state,
                publishedProjects: [action.payload.projectData, ...state.publishedProjects],
            };
        case actionTypes.SET_DRAFTEDPROJECT:
            var storedDraftedProjects = JSON.parse(localStorage.getItem("draftedProjects"));
            storedDraftedProjects.unshift(action.payload.projectData);
            localStorage.setItem("draftedProjects", JSON.stringify(storedDraftedProjects));
            return {
                ...state,
                draftedProjects: [action.payload.projectData, ...state.draftedProjects],
            };
        case actionTypes.SET_REVIEWPROJECT:
            var storedReviewProjects = JSON.parse(localStorage.getItem("reviewProjects"));
            storedReviewProjects.unshift(action.payload.projectData);
            localStorage.setItem("reviewProjects", JSON.stringify(storedReviewProjects));
            return {
                ...state,
                reviewProjects: [action.payload.projectData, ...state.reviewProjects],
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
                        return { ...project, ...action.payload.projectData };
                    }
                    else {
                        return { ...project }
                    }
                });
                localStorage.setItem("publishedProjects", JSON.stringify(updatedProjects))
                return {
                    ...state,
                    publishedProjects: [...updatedProjects]
                }
            }
            else if (action.payload.project.projectStatus === "isDrafted") {
                const updatedProjects = state.draftedProjects.map((project) => {
                    if (project.id == action.payload.project.id) {
                        return { ...project, ...action.payload.projectData };
                    }
                    else {
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


export default projectsReducer