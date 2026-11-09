import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"

// A Firebase web config is public by design: it identifies the project, it
// doesn't grant access. Access is enforced by the Firestore security rules in
// /firestore.rules, plus the API key's HTTP referrer restrictions in Google
// Cloud.
const firebaseConfig = {
    apiKey: "AIzaSyC3qmU-7C6MQmVh5xrz1wAh5IGeSDlDEls",
    authDomain: "pokemon-4e8df.firebaseapp.com",
    projectId: "pokemon-4e8df",
    storageBucket: "pokemon-4e8df.appspot.com",
    messagingSenderId: "550224616083",
    appId: "1:550224616083:web:17fa110e44e86b8a81cb66",
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: "select_account" })

export const signInWithGoogle = () => signInWithPopup(auth, provider)
export const signOutUser = () => signOut(auth)

// Closing the Google popup is a user choice, not an error worth reporting.
export const isPopupClosed = (error) =>
    error?.code === "auth/popup-closed-by-user" || error?.code === "auth/cancelled-popup-request"
