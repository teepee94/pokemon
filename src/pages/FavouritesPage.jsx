import Masthead from "../components/Masthead"
import FavouritesList from "../components/FavouritesList"

function FavouritesPage() {
    return (
        <>
            <title>My Favourites · Pokédex</title>
            <Masthead
                eyebrow="Account"
                title="My Favourites"
                summary="Pokémon you've saved from their detail pages."
            />
            <FavouritesList />
        </>
    )
}

export default FavouritesPage
