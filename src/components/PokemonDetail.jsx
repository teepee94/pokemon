import { Link } from "react-router-dom"
import { skipToken } from "@reduxjs/toolkit/query"
import "../styles/components/_components.detail.scss"
import {
    useGetPokemonPageQuery,
    useGetPokemonQuery,
    useGetSpeciesQuery,
} from "../features/pokemon/pokemonApi"
import { getIdFromUrl } from "../utils/getIdFromUrl"
import { formatName } from "../utils/format"
import Masthead from "./Masthead"
import DetailHero from "./detail/DetailHero"
import DetailStats from "./detail/DetailStats"
import DetailAbout from "./detail/DetailAbout"
import DetailMoves from "./detail/DetailMoves"
import DetailPager from "./detail/DetailPager"

// Alternate forms (megas, regional variants) have ids from 10001 upwards and
// sit outside National Dex order, so they get no prev/next links.
const FORM_ID_START = 10000

// The National Dex entries either side of `id`, from one 2–3 item page.
const neighboursQuery = (pokemon) =>
    pokemon && pokemon.id < FORM_ID_START
        ? { offset: Math.max(0, pokemon.id - 2), limit: pokemon.id === 1 ? 2 : 3 }
        : skipToken

function PokemonDetail({ name }) {
    const { data: pokemon, error, isError, refetch } = useGetPokemonQuery(name)
    // Species and neighbours are enhancements: the page renders without them
    // and fills them in as they arrive.
    const { data: species } = useGetSpeciesQuery(pokemon ? getIdFromUrl(pokemon.species.url) : skipToken)
    const { data: neighbours } = useGetPokemonPageQuery(neighboursQuery(pokemon))

    if (isError) {
        const isNotFound = error?.status === 404

        return (
            <>
                <Masthead
                    eyebrow="Pokédex"
                    title={isNotFound ? "Pokémon not found" : "Something went wrong"}
                />
                <div className="container">
                    <div className="c-panel c-detail__message" role="alert">
                        <p>
                            {isNotFound ? (
                                <>We couldn't find a Pokémon called “{name}”.</>
                            ) : (
                                "We couldn't load this Pokémon. Please check your connection and try again."
                            )}
                        </p>
                        {isNotFound ? (
                            <Link to="/" className="c-btn c-btn--primary">
                                Back to the Pokédex
                            </Link>
                        ) : (
                            <button type="button" className="c-btn c-btn--primary" onClick={refetch}>
                                Try again
                            </button>
                        )}
                    </div>
                </div>
            </>
        )
    }

    if (!pokemon) {
        return (
            <div className="c-detail" aria-busy="true">
                <Masthead eyebrow="Pokédex" title={formatName(name)} summary="Loading…" />
            </div>
        )
    }

    const results = neighbours?.results ?? []
    const prev = pokemon.id > 1 ? results[0] : null
    const next = results[pokemon.id > 1 ? 2 : 1] ?? null
    const primaryType = pokemon.types[0]?.type.name

    // The type class themes the hero glow and stat bars via --type-color.
    return (
        <div className={`c-detail c-detail--${primaryType}`}>
            <DetailHero pokemon={pokemon} species={species} />
            <div className="container c-detail__body">
                <div className="c-detail__grid">
                    <DetailStats pokemon={pokemon} />
                    <DetailAbout pokemon={pokemon} species={species} />
                    <DetailMoves key={pokemon.name} pokemon={pokemon} />
                </div>
                <DetailPager prev={prev} next={next} />
            </div>
        </div>
    )
}

export default PokemonDetail
