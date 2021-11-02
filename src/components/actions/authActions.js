import { auth, googleAuth } from "../config/firebaseConfig"
import { signInWithPopup, signOut} from "firebase/auth"

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