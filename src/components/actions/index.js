import * as actionTypes from "./types";


export const setServerError = () => ({
    type: actionTypes.SET_SERVERERROR,
})


export const setUser = (user) => ({
    type: actionTypes.SET_USER,
    payload: {
        user: user
    }
})


export const setNewUser = () => ({
    type: actionTypes.SET_NEWUSER,
})


export const clearUser = () => ({
    type: actionTypes.CLEAR_USER,
})


export const projectsInit = () => ({
    type: actionTypes.PROJECTS_INIT,
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


export const disablerOn = () => ({
    type: actionTypes.DISABLER_ON,
})


export const disablerOff = () => ({
    type: actionTypes.DISABLER_OFF,
})


export const setGlintHubSpaceProject = (projectData) => ({
    type: actionTypes.SET_GLINTHUBSPACEPROJECT,
    payload: {
        projectData: projectData
    }
})


export const glintHubSpaceProjectsLoaded = () => ({
    type: actionTypes.GLINTHUBSPACEPROJECTS_LOADED,
})


export const glintHubSpaceFilterText = (text) => ({
    type: actionTypes.GLINTHUBSPACEFILTER_TEXT,
    payload: {
        text
    }
})


export const glintHubSpaceFilterTech = (tech) => ({
    type: actionTypes.GLINTHUBSPACEFILTER_TECH,
    payload: {
        tech
    }
})
