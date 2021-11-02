const authReducerDefaultState = [];

export default (state = authReducerDefaultState, action) => {
    switch(action.type) {
        case "LOGIN":
            return {
                uid: action.user.uid,
                email: action.user.email,
                picture: action.user.photoURL,
                displayName: action.user.displayName
            }
        default:
            return state
    }
}