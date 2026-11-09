import { app } from "./firebase"

// Firestore is the largest part of the Firebase SDK and is only needed once a
// signed-in user reads or writes favourites, so it's split into its own chunk
// and loaded on first use.
let firestore

export const loadFirestore = () => {
    firestore ??= import("firebase/firestore").then((module) => ({
        ...module,
        db: module.getFirestore(app),
    }))
    return firestore
}
