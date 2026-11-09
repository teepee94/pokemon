import Masthead from "../components/Masthead"
import Listing from "../components/Listing"

function PokedexPage() {
    return (
        <>
            <title>Pokédex</title>
            <Masthead
                eyebrow="Pokédex"
                title="Find your Pokémon"
                summary="Browse every Pokémon, filter by generation and compare up to four side by side."
            />
            <Listing />
        </>
    )
}

export default PokedexPage
