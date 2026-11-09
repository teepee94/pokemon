import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ListingItem from './ListingItem'
import "../../resources/sass/components/_components.listing.scss"
import "../../resources/sass/components/_components.profile.scss"
import { collection, getDocs } from "firebase/firestore";

import { db, signInWithGoogle } from "../../resources/js/firebase/firebase"

import { useSelector } from 'react-redux'
import { selectUser } from "../../resources/js/redux/userSlice"

function Profile() {
    const { uid, status } = useSelector(selectUser)

    const [favourites, setFavourites] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        // Signed out (or switched account): never keep showing the old list.
        setFavourites([])
        setError(null)

        if (!uid) return

        // getDocs can't be aborted, so ignore the result if uid changes or we
        // unmount before it resolves.
        let ignore = false
        setIsLoading(true)

        getDocs(collection(db, "pokemon", uid, "favourites"))
            .then(querySnapshot => {
                if (ignore) return
                setFavourites(querySnapshot.docs.map(doc => ({ name: doc.id, id: doc.data().id })))
            })
            .catch(err => {
                if (!ignore) setError(err)
            })
            .finally(() => {
                if (!ignore) setIsLoading(false)
            })

        return () => { ignore = true }
    }, [uid])

    let content

    if (status === "loading" || isLoading) {
        content = <p className="c-profile__message" aria-live="polite">Loading…</p>
    } else if (!uid) {
        content = (
            <div className="c-profile__panel">
                <h2 className="c-profile__title">Sign in to see your favourites</h2>
                <p className="c-profile__text">Save Pokémon from their detail pages and they'll appear here.</p>
                <button type="button" className="c-btn c-btn--primary" onClick={() => signInWithGoogle().catch(() => {})}>
                    Sign in with Google
                </button>
            </div>
        )
    } else if (error) {
        content = <p className="c-profile__message" role="alert">Sorry, we couldn't load your favourites.</p>
    } else if (favourites.length === 0) {
        content = (
            <div className="c-profile__panel">
                <h2 className="c-profile__title">No favourites yet</h2>
                <p className="c-profile__text">Open any Pokémon and choose “Add to Favourites” to save it here.</p>
                <Link to="/" className="c-btn c-btn--primary">Browse Pokémon</Link>
            </div>
        )
    } else {
        content = (
            <ul className="c-listing__grid">
                {favourites.map(favourite => (
                    <ListingItem key={favourite.name} name={favourite.name} id={favourite.id} />
                ))}
            </ul>
        )
    }

    return (
        <section className="c-profile">
            <div className="container">{content}</div>
        </section>
    )
}

export default Profile
