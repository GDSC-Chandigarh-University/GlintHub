import * as actionTypes from "../actions/types";


const initialUserState = {
    isLoading: true,
    user: null,
    newUserLoading: true
};


const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.payload.user,
                isLoading: false
            };
        case actionTypes.SET_NEWUSER:
            return {
                ...state,
                newUserLoading: false
            };
        case actionTypes.CLEAR_USER:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};


export default userReducer
