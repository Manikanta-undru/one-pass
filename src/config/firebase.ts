import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";

import { collection, deleteDoc, doc, getDocs, getFirestore, limit, orderBy, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDT-hax0XpZdwtTtv0_TFMoz-pVsROzYho",
    authDomain: "onepass-2677e.firebaseapp.com",
    projectId: "onepass-2677e",
    storageBucket: "onepass-2677e.appspot.com",
    messagingSenderId: "160760694129",
    appId: "1:160760694129:web:41af81534bc80c1d9122d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db =getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({   
        prompt: "select_account"
});

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const logOut = () => auth.signOut();

export const getExistingUserData = async (uid:string | undefined) => {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0] || null;
  };

export const getAllEntries = async (uid:string | undefined) => {
    const q = query(collection(db, "entries"), where("uid", "==", uid),orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs || null;
};
export const getLatestEntry = async (uid: string | undefined) => {
    const q = query(collection(db, "entries"), where("uid", "==", uid), orderBy("timestamp", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    const latestEntry = querySnapshot.docs[0];
    return latestEntry || null;
};

export const deleteEntry = async (id:string) => {
    await deleteDoc(doc(db, "entries", id));
}


export { app, auth, db };
