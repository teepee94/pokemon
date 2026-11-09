import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../lib/firebase"
import { favouritesApi } from "../favourites/favouritesApi"
import { login, logout } from "./userSlice"

// Subscribes to Firebase auth once for the lifetime of the app and mirrors
// the result into Redux. Mounted in the root layout.
export function useAuthListener() {
    const dispatch = useDispatch()

    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    dispatch(login({ uid: user.uid, displayName: user.displayName }))
                } else {
                    dispatch(logout())
                    // Drop the previous user's cached favourites on sign-out.
                    dispatch(favouritesApi.util.resetApiState())
                }
            }),
        [dispatch],
    )
}
