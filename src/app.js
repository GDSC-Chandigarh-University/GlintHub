import React from "react";
import ReactDOM from "react-dom";
import '../styles/styles.scss';
import Router from './components/router/router';
import { Provider } from 'react-redux';
import { onAuthStateChanged, getAuth } from '@firebase/auth'
import { auth } from "./components/config/firebaseConfig"
import configureStore from "./components/store/configureStore";
import { Login } from "./components/actions/authActions"


const store = configureStore()

ReactDOM.render(<Router />, document.getElementById('upper-root'))

onAuthStateChanged(auth, (user) => {
    if(user) {
        console.log("Logged In")
        store.dispatch(Login(user))
        console.log(store.getState())
    } else {
        console.log("Logged Out")
        console.log(store.getState())
    }
})