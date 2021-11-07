import { auth, googleAuth } from "../config/firebaseConfig"
import { signInWithPopup } from "firebase/auth"
import { useState, useEffect } from "react"
import { onSnapshot, collectionGroup } from "firebase/firestore"
import { firestore } from "../config/firebaseConfig"
import { collection, where, query } from "@firebase/firestore"


export const Login = (user) => {
    return {
        type: "LOGIN",
        user
    }
}

export const StartLogin = async () => {
    return await signInWithPopup(auth, googleAuth)
    .catch((error) => {
        console.log(error)
    });
}