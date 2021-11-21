import * as actionTypes from "../actions/types";


const initialDisablerState = {
    disable: false
};


const disablerReducer = (state = initialDisablerState, action) => {
    switch (action.type) {
        case actionTypes.DISABLER_ON:
            return {
                ...state,
                disable: true
            };
        case actionTypes.DISABLER_OFF:
            return {
                ...state,
                disable: false
            };
        default:
            return state;
    }
};


export default disablerReducer