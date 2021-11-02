import app from "./firebaseConfig"
import { getFirestore, onSnapshot, collectionGroup, query, where, collection } from "firebase/firestore"
import {GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth"
import { useState, useEffect } from "react";
import { AuthState } from "./firebaseauth";
import { connect } from "react-redux";
import authReducer from "../reducers/authReducer";

const auth = getAuth(app)

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

function Getprojectuid(props) { 
  const [projects, setprojects] = useState([])
  const [projectuid, setprojectuid] = useState()
  useEffect(async () => {
    console.log(props.uid)
    const q = query(collection(firestore,'projects'),where("useruid", "==", props.uid))
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

export const Projectuid = connect((state) => {
  return {
  uid: state.authReducer.uid
  }
})(Getprojectuid)

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