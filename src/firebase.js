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
  
//Inicializa Firebase
firebase.initializeApp(firebaseConfig);
// Exporta la funcionalidad de la base de datos
export const firestore = firebase.firestore();

// el módulo de autenticacíon
export const auth = firebase.auth();
// el provedor de autenticación
export const provider = new firebase.auth.GoogleAuthProvider();
// la utilidad para hacer login con el pop-up
export const loginConGoogle = () => auth.signInWithPopup(provider);
// la utilidad para hacer logout
export const logout = () => auth.signOut();

// Exporta el paquete firebase para otros usos
export default firebase;