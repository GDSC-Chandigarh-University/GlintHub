import React from 'react'
import { useState, useEffect } from 'react'
import { onAuthStateChanged, getAuth } from '@firebase/auth'
import { initializeApp } from '@firebase/app';
import app from "./firebaseConfig"

const auth = getAuth(app)
function AuthenticationState() {
    const [currentUser, setcurrentUser] = useState()
    const [uid, setuid] = useState()
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user)=>{
        if(user) {
          setcurrentUser(user)
          setuid(user.uid)
        }
      })
      return unsub
    }, [])
    return {currentUser, uid};
  }

export const AuthState = AuthenticationState