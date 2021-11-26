import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDezn07v6zrsziRQYBhWg42EPB3eCYTRa0",
    authDomain: "second-firebase-6a3fe.firebaseapp.com",
    projectId: "second-firebase-6a3fe",
    storageBucket: "second-firebase-6a3fe.appspot.com",
    messagingSenderId: "667417469035",
    appId: "1:667417469035:web:041b813ccf98423de1512e"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// Exporta la funcionalidad de la DB
export const firestore = firebase.firestore()
// exporta el paquete de firebase para poder usarlo
export default firebase