import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBCOihiNoluySzDwWudFEwgOYmtsXtvo8Y",
    authDomain: "whatsapp2-18b7a.firebaseapp.com",
    projectId: "whatsapp2-18b7a",
    storageBucket: "whatsapp2-18b7a.appspot.com",
    messagingSenderId: "1032243474502",
    appId: "1:1032243474502:web:23697e13915e23422fda47"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();

// const auth = app.auth();//v8
const auth = getAuth(app);

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };