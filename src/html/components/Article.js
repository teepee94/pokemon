import React from 'react'
import { Link, useParams } from "react-router-dom";
import "../../resources/sass/components/_components.detail.scss"
import { usePokemonDetail } from '../../resources/js/api/usePokemonDetail'
import { formatName } from "../../resources/js/utils/format"
import Masthead from "./Masthead"
import DetailHero from './detail/DetailHero'
import DetailStats from './detail/DetailStats'
import DetailAbout from './detail/DetailAbout'
import DetailMoves from './detail/DetailMoves'
import DetailPager from './detail/DetailPager'

function Article() {
    const { name } = useParams();
    const { pokemon, species, neighbours, error } = usePokemonDetail(name)

    if (error) {
        const isNotFound = error.response?.status === 404

        return (
            <>
            <Masthead eyebrow="Pokédex" title={isNotFound ? "Pokémon not found" : "Something went wrong"} />
            <div className="container">
                <div className="c-panel c-detail__message" role="alert">
                    <p>
                        {isNotFound
                            ? <>We couldn't find a Pokémon called “{name}”.</>
                            : "We couldn't load this Pokémon. Please check your connection and try again."}
                    </p>
                    <Link to="/" className="c-btn c-btn--primary">Back to the Pokédex</Link>
                </div>
            </div>
            </>
        )
    }

    if (!pokemon) {
        return (
            <div className="c-detail is-loading" aria-busy="true">
                <Masthead eyebrow="Pokédex" title={formatName(name)} summary="Loading…" />
            </div>
        )
    }

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
                <DetailPager prev={neighbours.prev} next={neighbours.next} />
            </div>
        </div>
    )
}

export default Article
