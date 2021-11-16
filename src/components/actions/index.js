import * as actionTypes from "./types";

export const setUser = (user) => ({
    type: actionTypes.SET_USER,
    payload: {
        user: user
    }
})

export const clearUser = () => ({
    type: actionTypes.CLEAR_USER,
})

export const setPublishedProject = (projectData) => ({
    type: actionTypes.SET_PUBLISHEDPROJECT,
    payload: {
        projectData: projectData
    }
})

export const setDraftedProject = (projectData) => ({
    type: actionTypes.SET_DRAFTEDPROJECT,
    payload: {
        projectData: projectData
    }
})

export const setReviewProject = (projectData) => ({
    type: actionTypes.SET_REVIEWPROJECT,
    payload: {
        projectData: projectData
    }
})

export const projectsLoaded = () => ({
    type: actionTypes.PROJECTS_LOADED,
})

export const updateProject = (projectId, projectData) => ({
    type: actionTypes.UPDATE_PROJECT,
    payload: {
        projectId: projectId,
        projectData: projectData
    }
})

export const deleteProject = (projectId) => ({
    type: actionTypes.DELETE_PROJECT,
    payload: {
        projectId: projectId
    }
})