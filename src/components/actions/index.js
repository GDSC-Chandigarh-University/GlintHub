import * as actionTypes from "./types";

export const setUser = (user) => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user
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