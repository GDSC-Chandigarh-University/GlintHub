import { connect } from "react-redux"
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useState, useEffect } from "react";
import configureStore from "./configureStore";
import { Login } from "../actions/authActions";
import Projectuid from "./Projectuid";
import { GetProjectuid } from "../actions/authActions";

const store = configureStore()

const Reducer = () => {
    const [user, setuser] = useState()
    onAuthStateChanged(auth, (user) => {
        if(user) {
            console.log("Logged In")
            setuser(user)
            store.dispatch(Login(user))
            console.log(store.getState().authReducer.uid)
        } else {
            console.log("Logged Out")
        }
    })
        console.log(GetProjectuid("anIQcsHiKCP8kcZ203pLQBdbaMy2"))
    return <div>    
         <Projectuid/>
    </div>
}

export default Reducer