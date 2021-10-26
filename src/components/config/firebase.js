import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth"
import { useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyC2s2ojO76wtSU8fo0QnHHN3wYk47pscKw",
  authDomain: "gdsccu-decd0.firebaseapp.com",
  projectId: "gdsccu-decd0",
  storageBucket: "gdsccu-decd0.appspot.com",
  messagingSenderId: "876586180057",
  appId: "1:876586180057:web:791ef6f49e9eb476818dc8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

export const firestore = getFirestore(app)

export async function GoogleAuthLogin() {
  const provider = new GoogleAuthProvider()
  return await signInWithPopup(auth,provider)
  .catch((error) => {
    console.log(error)
  });
}

export async function GoogleAuthLogout() {
  await signOut(auth).catch((error) => {
    console.log(error)
  });
}

export function AuthState() {
  const [currentUser, setcurrentUser] = useState()
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user)=>{
      setcurrentUser(user)
    })
    return unsub
  }, [])
  return currentUser;
}