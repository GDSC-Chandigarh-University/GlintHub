import React from "react";
import ReactDOM from "react-dom";
import './styles/styles.scss';
import Router from './components/router/router';
import { auth } from "./components/config/firebaseConfig"
import configureStore from "./components/store/configureStore";
import { Provider } from "react-redux";
import { onAuthStateChanged } from "@firebase/auth";
import { Login } from "./components/actions/authActions";
import Reducer from "./components/store/Reducer";

const store = configureStore()
store.subscribe(()=>{
    console.log(store.getState())
})

onAuthStateChanged(auth, (user) => {
    if(user) {
        console.log("Logged In")
        store.dispatch(Login(user))
    } else {
        console.log("Logged Out")
    }
})

ReactDOM.render(
<Provider store={store}>
    <Router />
</Provider>, document.getElementById('upper-root'))
