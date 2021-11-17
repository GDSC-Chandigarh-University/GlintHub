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

export const updateProject = (project, projectData) => ({
    type: actionTypes.UPDATE_PROJECT,
    payload: {
        project: project,
        projectData: projectData
    }
})

export const deleteProject = (project) => ({
    type: actionTypes.DELETE_PROJECT,
    payload: {
        project: project
    }
})