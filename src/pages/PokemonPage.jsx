import { useParams } from "react-router-dom"
import PokemonDetail from "../components/PokemonDetail"
import { formatName } from "../utils/format"

function PokemonPage() {
    const { name } = useParams()

    return (
        <>
            <title>{`${formatName(name)} · Pokédex`}</title>
            {/* key resets per-pokemon UI state (tabs, search) on navigation */}
            <PokemonDetail key={name} name={name} />
        </>
    )
}

export default PokemonPage
