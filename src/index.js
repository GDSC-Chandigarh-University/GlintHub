import React from "react";
import ReactDOM from "react-dom";
// import '../styles/styles.scss';
import Router from './components/router/router';
import { onAuthStateChanged } from '@firebase/auth'
import { auth } from "./components/config/firebaseConfig"
import configureStore from "./components/store/configureStore";
import { GetProjectuid, Projects } from "./components/actions/authActions"


const store = configureStore()

ReactDOM.render(<Router />, document.getElementById('root'))

onAuthStateChanged(auth, (user) => {
    if(user) {
        console.log("Logged In")
        console.log(user.uid)
        const getprojectuid = GetProjectuid(user.uid)
        console.log(getprojectuid)
        store.dispatch(Projects(getprojectuid.projects, getprojectuid.projectuid))
        console.log(store.getState())
    } else {
        console.log("Logged Out")
        console.log(store.getState())
    }
})