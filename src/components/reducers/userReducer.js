import * as actionTypes from "../actions/types";


const initialUserState = {
    isLoading: true,
    user: null,
};


const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.payload.user,
                isLoading: false
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