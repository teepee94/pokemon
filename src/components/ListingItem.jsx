import { Link } from "react-router-dom"
import { useCompareToggle } from "../features/compare/useCompareToggle"
import { usePrefetch } from "../features/pokemon/pokemonApi"
import { formatId, formatName, getArtworkUrl } from "../utils/format"

function ListingItem({ name, id }) {
    const { isSelected, isDisabled, label, toggle } = useCompareToggle(name, id)
    // Start loading the detail page's data as soon as the user shows intent.
    const prefetchPokemon = usePrefetch("getPokemon")
    const prefetch = () => prefetchPokemon(name)

    return (
        <li className={`c-card ${isSelected ? "is-selected" : ""}`}>
            <div className="c-card__media">
                <img
                    src={getArtworkUrl(id)}
                    className="c-card__image"
                    alt=""
                    width="240"
                    height="240"
                    loading="lazy"
                    decoding="async"
                />
            </div>
            <div className="c-card__body">
                <span className="c-card__number">{formatId(id)}</span>
                <h3 className="c-card__title">
                    {/* The link stretches over the whole card via ::after */}
                    <Link
                        to={`/pokemon/${name}`}
                        className="c-card__link"
                        onMouseEnter={prefetch}
                        onFocus={prefetch}
                    >
                        {formatName(name)}
                    </Link>
                </h3>
            </div>
            <button
                type="button"
                onClick={toggle}
                disabled={isDisabled}
                aria-pressed={isSelected}
                aria-label={label}
                title={label}
                className="c-card__compare"
            >
                <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                    {isSelected ? <path d="M4 10.5l4 4 8-9" /> : <path d="M10 4v12M4 10h12" />}
                </svg>
                <span>{isSelected ? "Added" : "Compare"}</span>
            </button>
        </li>
    )
}

export default ListingItem
