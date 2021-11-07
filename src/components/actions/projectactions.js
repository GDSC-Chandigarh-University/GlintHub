import { useState, useEffect } from "react"
import { onSnapshot, collectionGroup } from "firebase/firestore"
import { firestore } from "../config/firebaseConfig"
import { collection, where, query } from "@firebase/firestore"

export const Projects = (projects, projectuid) => {
    return {
        type: "PROJECTS",
        projects,
        projectuid
    }
}

export function GetProjectuid(useruid) { 
  console.log(useruid)
    const [projects, setprojects] = useState([])
    const [projectuid, setprojectuid] = useState()
    
    useEffect(async () => {
      const q = query(collection(firestore,'projects'),where("useruid", "==", useruid))
      const unsub = onSnapshot(q,(snapshot)=>{
          try {
            setprojects(snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
              }))
              setprojectuid(snapshot.docs.length + 1)
          } catch(error) {
              console.log(error)
          }
        
      })
      return unsub
    }, [])

    return {projects, projectuid}
  }

  export function UserProjectStatus() {
    const [totalprojects, settotalprojects] = useState()
    const [projects, setprojects] = useState([])
    useEffect(() => {
      const collectionprojectref = collectionGroup(firestore, 'Projects')
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