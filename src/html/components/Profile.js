import React, { useState, useEffect } from 'react'
import ListingItem from './ListingItem'
import "../../resources/sass/components/_components.profile.scss"
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../resources/js/firebase/firebase"

import { useSelector } from 'react-redux'
import { selectUser } from "../../resources/js/redux/userSlice"

function Profile(c) {
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

    const title = status === "loading"
        ? "Loading…"
        : uid ? "My Favourite Pokemon" : "Please login to view"

    return (
        <div className={`c-profile ${c.class ? c.class : "" }`}>
            <div className="container">
                <div className="row">
                    <h1 className="c-profile__title">{title}</h1>
                </div>
                <div className="row" aria-busy={isLoading}>
                    {error && <p role="alert">Sorry, we couldn't load your favourites.</p>}
                    {uid && !isLoading && !error && favourites.length === 0 && <p>You haven't added any favourites yet.</p>}
                    {favourites.map(favourite => (
                        <ListingItem key={favourite.name} title={favourite.name} image={favourite.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile
