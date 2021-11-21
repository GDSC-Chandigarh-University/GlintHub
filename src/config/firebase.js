import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "@firebase/auth";
import { getFirestore, collection, doc, setDoc, query, orderBy, where, deleteDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyC2s2ojO76wtSU8fo0QnHHN3wYk47pscKw",
    authDomain: "gdsccu-decd0.firebaseapp.com",
    projectId: "gdsccu-decd0",
    storageBucket: "gdsccu-decd0.appspot.com",
    messagingSenderId: "876586180057",
    appId: "1:876586180057:web:791ef6f49e9eb476818dc8"
};


export const firebaseApp = initializeApp(firebaseConfig);


export const firestore = getFirestore(firebaseApp);


export const provider = new GoogleAuthProvider()


export const auth = getAuth(firebaseApp);


export async function GoogleAuthLogin() {
    return await signInWithPopup(auth, provider)
        .catch((error) => {
            console.log(error)
        });
}


export async function GoogleAuthLogout() {
    await signOut(auth).catch((error) => {
        console.log(error)
    });
}


export const setDocProject = (id, data) => setDoc(doc(firestore, "Projects", id), data)


export const getUserCollectionProjects = (userUid) => query(collection(firestore, "Projects"), where("userUid", "==", userUid), orderBy("timestamp", 'asc'))


export const getAllCollectionProjects = query(collection(firestore, "Projects"), orderBy("timestamp", 'asc'))


export const updateDocProject = (id, data) => updateDoc(doc(firestore, "Projects", id), data);


export const deleteDocProject = (projectId) => deleteDoc(doc(firestore, "Projects", projectId))


export const setDocMessage = (id, data) => setDoc(doc(firestore, "Messages", id), data)


export const getCollectionMessages = (projectId) => query(collection(firestore, "Messages"), where("id", "==", projectId), orderBy("timestamp", 'asc'))


export const storage = getStorage(firebaseApp)


export const storageProject = (id) => ref(storage, `/Projects/${id}`);
