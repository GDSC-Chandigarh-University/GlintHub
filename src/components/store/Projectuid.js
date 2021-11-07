import configureStore from "./configureStore";
import { Login } from "../actions/authActions";
import { GetProjectuid } from "../actions/authActions";
import { connect } from "react-redux";
import authReducer from "../reducers/authReducer";
import { useEffect } from "react";

const store = configureStore()

const Projectuid = (props) => {   
    useEffect(() => {
        console.log(store.getState())
        console.log(props.state)
      }, []) 
    return <div>
        {props.state.authReducer.uid}
    </div>
}

export default connect((state)=>{
    return {
        state
    }
})(Projectuid)