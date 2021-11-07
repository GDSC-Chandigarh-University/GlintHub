const projectReducerDefaultState = [];

export default (state = projectReducerDefaultState, action) => {
    switch(action.type) {
        case "PROJECTS":
            return {
                projects: action.projects,
                projectsuid: action.projectsuid
            }
        default:
            return state
    }
}