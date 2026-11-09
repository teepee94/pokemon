import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore'
import { db, signInWithGoogle } from './firebase'
import { selectUser } from '../redux/userSlice'

// Favourite state for one pokemon: reads whether it's already saved and
// toggles it. Signed-out users are prompted to sign in instead.
//
// status: "idle" (not saved) | "saved" | "checking" | "saving" | "error"
export function useFavourite(pokemon) {
	const { uid } = useSelector(selectUser)
	const [status, setStatus] = useState("idle")

	const name = pokemon?.name

	useEffect(() => {
		setStatus("idle")
		if (!uid || !name) return

		let ignore = false
		setStatus("checking")

		getDoc(doc(db, "pokemon", uid, "favourites", name))
			.then(snapshot => { if (!ignore) setStatus(snapshot.exists() ? "saved" : "idle") })
			.catch(() => { if (!ignore) setStatus("idle") })

		return () => { ignore = true }
	}, [uid, name])

	const toggle = async () => {
		if (!uid) {
			try {
				await signInWithGoogle()
			} catch (err) {
				if (err?.code !== "auth/popup-closed-by-user") console.error(err)
			}
			return
		}

		const ref = doc(db, "pokemon", uid, "favourites", name)
		const wasSaved = status === "saved"
		setStatus("saving")

		try {
			if (wasSaved) {
				await deleteDoc(ref)
				setStatus("idle")
			} else {
				await setDoc(ref, { id: pokemon.id })
				setStatus("saved")
			}
		} catch (err) {
			console.error(err)
			setStatus("error")
		}
	}

	return { status, isSignedIn: Boolean(uid), toggle }
}
