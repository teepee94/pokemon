import React from 'react'
import TypeBadge from '../TypeBadge'
import CryButton from './CryButton'
import { useCompareToggle } from '../../../resources/js/redux/useCompareToggle'
import { useFavourite } from '../../../resources/js/firebase/useFavourite'
import {
    formatGeneration,
    formatHeight,
    formatId,
    formatName,
    formatWeight,
    getArtworkUrl,
    getEnglishFlavourText,
    getEnglishGenus,
} from '../../../resources/js/utils/format'

const FAVOURITE_LABELS = {
    idle: "Favourite",
    checking: "Favourite",
    saving: "Saving…",
    saved: "Favourited",
    error: "Try again",
}

function Icon({ path, filled = false }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={filled ? "is-filled" : undefined}>
            <path d={path} />
        </svg>
    )
}

const HEART = "M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"
const PLUS = "M12 5v14M5 12h14"
const CHECK = "M5 12.5l4.5 4.5L19 7.5"

function DetailHero({ pokemon, species }) {
    const favourite = useFavourite(pokemon)
    const compare = useCompareToggle(pokemon.name, pokemon.id)

    const genus = getEnglishGenus(species)
    const flavourText = getEnglishFlavourText(species)

    const isFavourite = favourite.status === "saved"
    const favouriteLabel = favourite.isSignedIn ? FAVOURITE_LABELS[favourite.status] : "Favourite"
    // Signed-out users are taken to Google sign-in; say so to assistive tech.
    const favouriteA11yLabel = favourite.isSignedIn ? undefined : `Sign in to favourite ${formatName(pokemon.name)}`

    return (
        <header className="c-detail-hero">
            <div className="container c-detail-hero__inner">
                <div className="c-detail-hero__media">
                    <img
                        src={getArtworkUrl(pokemon.id)}
                        alt={`Official artwork of ${formatName(pokemon.name)}`}
                        width="475"
                        height="475"
                        fetchpriority="high"
                    />
                </div>

                <div className="c-detail-hero__content">
                    <p className="c-detail-hero__eyebrow">
                        <span className="c-detail-hero__number">{formatId(pokemon.id)}</span>
                        {genus && <span>{genus}</span>}
                    </p>
                    <h1 className="c-detail-hero__title">{formatName(pokemon.name)}</h1>
                    <div className="c-detail-hero__types">
                        {pokemon.types.map(({ type }) => <TypeBadge key={type.name} type={type.name} />)}
                    </div>

                    <p className={`c-detail-hero__flavour ${flavourText ? "" : "is-loading"}`}>
                        {flavourText || " "}
                    </p>

                    <dl className="c-detail-hero__facts">
                        <div>
                            <dt>Height</dt>
                            <dd>{formatHeight(pokemon.height)}</dd>
                        </div>
                        <div>
                            <dt>Weight</dt>
                            <dd>{formatWeight(pokemon.weight)}</dd>
                        </div>
                        <div>
                            <dt>Introduced</dt>
                            <dd>{species ? formatGeneration(species.generation.name).replace("Generation", "Gen") : "—"}</dd>
                        </div>
                    </dl>

                    <div className="c-detail-hero__actions">
                        <button
                            type="button"
                            className={`c-detail-hero__btn c-detail-hero__btn--primary ${isFavourite ? "is-active" : ""}`}
                            onClick={favourite.toggle}
                            disabled={favourite.status === "saving" || favourite.status === "checking"}
                            aria-pressed={favourite.isSignedIn ? isFavourite : undefined}
                            aria-label={favouriteA11yLabel}
                            title={favouriteA11yLabel}
                        >
                            <Icon path={HEART} filled={isFavourite} />
                            {favouriteLabel}
                        </button>
                        <button
                            type="button"
                            className={`c-detail-hero__btn ${compare.isSelected ? "is-active" : ""}`}
                            onClick={compare.toggle}
                            disabled={compare.isDisabled}
                            aria-pressed={compare.isSelected}
                            title={compare.label}
                        >
                            <Icon path={compare.isSelected ? CHECK : PLUS} />
                            {compare.isSelected ? "In compare" : "Compare"}
                        </button>
                        <CryButton url={pokemon.cries?.latest} name={formatName(pokemon.name)} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default DetailHero
