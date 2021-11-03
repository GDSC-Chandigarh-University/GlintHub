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
        case "PROJECTS":
            return {
                projects: action.projects,
                projectuid: action.projectuid
            }
        default:
            return state
    }
}