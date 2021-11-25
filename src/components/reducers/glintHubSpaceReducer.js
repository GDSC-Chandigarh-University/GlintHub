import * as actionTypes from "../actions/types";


const initialGlintHubSpaceState = {
    isLoading: true,
    glintHubSpaceProjects: [],
};


const glintHubSpaceReducer = (state = initialGlintHubSpaceState, action) => {
    switch (action.type) {
        case actionTypes.SET_GLINTHUBSPACEPROJECT:
            return {
                ...state,
                glintHubSpaceProjects: [action.payload.projectData, ...state.glintHubSpaceProjects],
            };
        case actionTypes.GLINTHUBSPACEPROJECTS_LOADED:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};


export default glintHubSpaceReducer
