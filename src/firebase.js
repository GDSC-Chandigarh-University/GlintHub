import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
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

export const Firebaseapp = initializeApp(firebaseConfig);

export const Firestore = getFirestore(Firebaseapp);

export const UsersCollectionRef = collection(Firestore, "Users");

export const auth = getAuth(Firebaseapp);

export const storage = getStorage(Firebaseapp)

export const setDocProject = (id, data) => setDoc(doc(Firestore, "Projects", id), data)

export const getCollectionProjects = (userUid) => query(collection(Firestore, "Projects"), where("userUid", "==", userUid), orderBy("timestamp", 'desc'))

export const getAllCollectionProjects = query(collection(Firestore, "Projects"), orderBy("timestamp", 'desc'))

export const getCollectionMessages = (projectId) => query(collection(Firestore, "Messages"), where("id", "==", projectId), orderBy("timestamp", 'asc'))

export const setDocUser = (id, data) => setDoc(doc(Firestore, "Users", id), data)

export const deleteDocProject = (projectId) => deleteDoc(doc(Firestore, "Projects", projectId))

export const updateDocProject = (id, data) => updateDoc(doc(Firestore, "Projects", id), data);

export const setDocMessage = (id, data) => setDoc(doc(Firestore, "Messages", id), data)

export const storageProject = (id) => ref(storage, `/Projects/${id}`);

export const storageUser = (id) => ref(storage, `/Users/${id}`);