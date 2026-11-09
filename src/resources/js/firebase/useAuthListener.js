import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from './firebase'
import { login, logout } from '../redux/userSlice'

// Subscribes to Firebase auth once for the lifetime of the app and mirrors
// the result into Redux. Mount this at the root, not in a per-page component,
// otherwise a new listener is added on every route change.
export function useAuthListener() {
	const dispatch = useDispatch()

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				dispatch(login({ uid: user.uid, displayName: user.displayName }))
			} else {
				dispatch(logout())
			}
		})

		return unsubscribe
	}, [dispatch])
}
