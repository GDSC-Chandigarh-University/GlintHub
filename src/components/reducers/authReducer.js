const authReducerDefaultState = {
    uid: '',
    email: '',
    picture: '',
    displayName: ''
};

export default (state = authReducerDefaultState, action) => {
    switch(action.type) {
        case "LOGIN":
            return {
                ...state,
                uid: action.user.uid,
                email: action.user.email,
                picture: action.user.photoURL,
                displayName: action.user.displayName
            }
        default:
            return state
    }
}