import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC3qmU-7C6MQmVh5xrz1wAh5IGeSDlDEls",
  authDomain: "pokemon-4e8df.firebaseapp.com",
  projectId: "pokemon-4e8df",
  storageBucket: "pokemon-4e8df.appspot.com",
  messagingSenderId: "550224616083",
  appId: "1:550224616083:web:17fa110e44e86b8a81cb66"
};

// Initialize Firebase 
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const db = firebase.firestore();

export default firebase;