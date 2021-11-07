import { GetProjectuid } from "../actions/projectactions";
import { connect } from "react-redux";
import { Projects } from "../actions/projectactions";

const Reducer = (props) => {
    console.log(props.authReducer.uid)

    const projectuid = GetProjectuid(props.authReducer.uid)
    
    props.dispatch(Projects(projectuid.projects, projectuid.projectuid))   
    return null
}

export default connect((state) => {
    return {
        authReducer: state.authReducer
    }
})(Reducer)