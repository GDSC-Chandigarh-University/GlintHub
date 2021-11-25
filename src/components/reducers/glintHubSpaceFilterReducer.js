import * as actionTypes from "../actions/types";


const initialGlintHubSpaceFilterState = {
    text: '',
    tech: 'All'
};


const glintHubSpaceFilterReducer = (state = initialGlintHubSpaceFilterState, action) => {
    switch (action.type) {
        case actionTypes.GLINTHUBSPACEFILTER_TEXT:
            return {
                ...state,
                text: action.payload.text,
            };
        case actionTypes.GLINTHUBSPACEFILTER_TECH:
            return {
                ...state,
                tech: action.payload.tech,
            };
        default:
            return state;
    }
};


export default glintHubSpaceFilterReducer
