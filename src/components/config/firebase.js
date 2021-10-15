import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const config = {
  apiKey: "AIzaSyD6EZWTyyIoL-3zugPdRWwOYIEgtK_1_js",
  authDomain: "glinthub-ansh.firebaseapp.com",
  projectId: "glinthub-ansh",
  storageBucket: "glinthub-ansh.appspot.com",
  messagingSenderId: "701729041237",
  appId: "1:701729041237:web:e33677ba8a3b7890941ddc"
}

const app = initializeApp(config)

const Signupwithgoogle = function() {
  signInWithPopup(getAuth(app), new GoogleAuthProvider(app))
      .then((result) => {
        const user = result.user;
        console.log(user.email);
      }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
      });
}

export default Signupwithgoogle;