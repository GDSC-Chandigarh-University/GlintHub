import { auth, googleAuth } from "../config/firebaseConfig"
import { signInWithPopup } from "firebase/auth"

export const Login = (user) => {
    return {
        type: "LOGIN",
        user
    }
}

export const Projects = (projects, projectuid) => {
    return {
        type: "PROJECTS",
        projects,
        projectuid
    }
}

export function GetProjectuid(useruid) { 
    //     const [projects, setprojects] = useState(['sty'])
    //     const [projectuid, setprojectuid] = useState(0)
    
    // useEffect(async () => {
    //   console.log(useruid)
    //   const q = query(collection(firestore,'projects'),where("useruid", "==", useruid))
    //   const unsub = onSnapshot(q,(snapshot)=>{
    //       try {
    //         setprojects(snapshot.docs.map((doc) => {
    //             return { ...doc.data(), id: doc.id }
    //           }))
    //           setprojectuid(snapshot.docs.length + 1)
    //       } catch(error) {
    //           console.log(error)
    //       }
        
    //   })
    //   return unsub
    // }, [])
    const projects = []
    const projectuid = 7

    return {projects, projectuid}
  }



export const StartLogin = async () => {
    return await signInWithPopup(auth, googleAuth)
    .catch((error) => {
        console.log(error)
    });
}