import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDezn07v6zrsziRQYBhWg42EPB3eCYTRa0",
    authDomain: "second-firebase-6a3fe.firebaseapp.com",
    projectId: "second-firebase-6a3fe",
    storageBucket: "second-firebase-6a3fe.appspot.com",
    messagingSenderId: "667417469035",
    appId: "1:667417469035:web:041b813ccf98423de1512e"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Exporta la funcionalidad de la DB
export const firestore = firebase.firestore();

//el modulo de autenticación
export const auth = firebase.auth();
//el provedor de autenticación
export const provider = new firebase.auth.GoogleAuthProvider();
//la utilidad para hacer login con el pop up
export const logginConGoogle = auth.signInWithPopup(provider);
//la utilidad para haver logout
export const logout = () => auth.signOut();

// exporta el paquete de firebase para poder usarlo
export default firebase;