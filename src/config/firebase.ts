import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";

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

export const auth = getAuth(app)

const provider = new  GoogleAuthProvider();

provider.setCustomParameters({   
    prompt : "select_account "
});

export const signInWithGoogle = () =>  signInWithPopup(auth,provider);

export const logOut = () => auth.signOut();


export default app;