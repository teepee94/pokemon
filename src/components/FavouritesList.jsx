import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { skipToken } from "@reduxjs/toolkit/query"
import ListingItem from "./ListingItem"
import "../styles/components/_components.listing.scss"
import "../styles/components/_components.favourites.scss"
import { isPopupClosed, signInWithGoogle } from "../lib/firebase"
import { selectUser } from "../features/auth/userSlice"
import { useGetFavouritesQuery } from "../features/favourites/favouritesApi"

const signIn = () =>
    signInWithGoogle().catch((error) => {
        if (!isPopupClosed(error)) console.error(error)
    })

function Panel({ title, children }) {
    return (
        <div className="c-favourites__panel">
            <h2 className="c-favourites__title">{title}</h2>
            {children}
        </div>
    )
}

function FavouritesList() {
    const { uid, status } = useSelector(selectUser)
    // Same cached list the detail page's Favourite button reads and updates.
    const { data: favourites = [], isLoading, isError, refetch } = useGetFavouritesQuery(uid ?? skipToken)

    let content
    if (status === "loading" || isLoading) {
        content = (
            <p className="c-favourites__message" aria-live="polite">
                Loading…
            </p>
        )
    } else if (!uid) {
        content = (
            <Panel title="Sign in to see your favourites">
                <p className="c-favourites__text">
                    Save Pokémon from their detail pages and they'll appear here.
                </p>
                <button type="button" className="c-btn c-btn--primary" onClick={signIn}>
                    Sign in with Google
                </button>
            </Panel>
        )
    } else if (isError) {
        content = (
            <Panel title="Something went wrong">
                <p className="c-favourites__text" role="alert">
                    We couldn't load your favourites.
                </p>
                <button type="button" className="c-btn c-btn--primary" onClick={refetch}>
                    Try again
                </button>
            </Panel>
        )
    } else if (favourites.length === 0) {
        content = (
            <Panel title="No favourites yet">
                <p className="c-favourites__text">Open any Pokémon and choose “Favourite” to save it here.</p>
                <Link to="/" className="c-btn c-btn--primary">
                    Browse Pokémon
                </Link>
            </Panel>
        )
    } else {
        content = (
            <ul className="c-listing__grid">
                {favourites.map((favourite) => (
                    <ListingItem key={favourite.name} name={favourite.name} id={favourite.id} />
                ))}
            </ul>
        )
    }

    return (
        <section className="c-favourites">
            <div className="container">{content}</div>
        </section>
    )
}

export default FavouritesList
