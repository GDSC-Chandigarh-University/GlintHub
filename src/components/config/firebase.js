import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot, collectionGroup, query, where, collection } from "firebase/firestore"
import {GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth"
import { useState, useEffect } from "react";
import { AuthState } from "./firebaseauth";

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

function getprojectuid() { 
  const [projects, setprojects] = useState([])
  const [projectuid, setprojectuid] = useState()
  const useruid = AuthState().uid;
  useEffect(async () => {
    
    const q = query(collection(firestore,'projects'),where("useruid", "==", 'tePeul0YuihUemSEIfmsY6CUB1w2'))
    const unsub = onSnapshot(q,(snapshot)=>{
      setprojects(snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      }))
      setprojectuid(snapshot.docs.length + 1)
    })
    return unsub
  }, [])
  console.log(projects, projectuid)
  return {projects, projectuid}
}

export const Projectuid = getprojectuid

export function UserProjectStatus() {
  const [totalprojects, settotalprojects] = useState()
  const [projects, setprojects] = useState([])
  useEffect(async () => {
    const collectionprojectref = await collectionGroup(firestore, 'Projects')
    const unsub = onSnapshot(collectionprojectref, (snapshot) => {
      try{
      settotalprojects(snapshot.docs.length)
      setprojects(snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      }))
    }catch(error){
      console.log(error)
    }
    });
    return unsub
  }, [])
  return {totalprojects, projects}
}