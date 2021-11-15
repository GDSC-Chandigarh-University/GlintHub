import * as actionTypes from "./types";

export const setUser = (user) => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            user: user
        }
    }
}

export const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER,
    }
}

export const appsInit = () => {
    return {
        type: actionTypes.APPS_INIT,
    }
}

export const setPublishedApp = (app) => {
    return {
        type: actionTypes.SET_PUBLISHEDAPP,
        payload: {
            app: app
        }
    }
}

export const setDraftedApp = (app) => {
    return {
        type: actionTypes.SET_DRAFTEDAPP,
        payload: {
            app: app
        }
    }
}

export const setReviewApp = (app) => {
    return {
        type: actionTypes.SET_REVIEWAPP,
        payload: {
            app: app
        }
    }
}

export const appsLoaded = () => {
    return {
        type: actionTypes.APPS_LOADED,
    }
}

export const updateApp = (app, data) => {
    return {
        type: actionTypes.UPDATE_APP,
        payload: {
            app: app,
            data: data
        }
    }
}

export const deleteApp = (app) => {
    return {
        type: actionTypes.DELETE_APP,
        payload: {
            app: app
        }
    }
}