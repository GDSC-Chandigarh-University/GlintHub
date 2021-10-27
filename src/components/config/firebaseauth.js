import React from 'react'
import { useState, useEffect } from 'react'
import { onAuthStateChanged, getAuth } from '@firebase/auth'
import { initializeApp } from '@firebase/app';

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
const auth = getAuth(app)
function AuthenticationState() {
    const [currentUser, setcurrentUser] = useState()
    const [uid, setuid] = useState()
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user)=>{
        setcurrentUser(user)
        setuid(user.uid)
      })
      return unsub
    }, [])
    return {currentUser, uid};
  }

  export const AuthState = AuthenticationState