import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "../firebase";

import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import Login from './login';
import Loading from '../Components/Loading';

import React, { useEffect} from "react";
// import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";//v9


export default function App({ Component, pageProps }: AppProps) {

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
          {
            email: user.email,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            photoURL: user.photoURL,
          },
        { merge: true }//set updates and replace, if wasnt there initially then create it as well
      );
    }
  }, []);
  // }, [user]); //Error on passing 'user' arg

  if (loading) return <Loading />

  if (!user) return <Login />


  return <Component {...pageProps} />//Point at which we start routing
}
