import { Link } from "react-router-dom"
import { usePrefetch } from "../../features/pokemon/pokemonApi"
import { formatId, formatName, getSpriteUrl } from "../../utils/format"

function PagerLink({ pokemon, direction }) {
    const { name, id } = pokemon
    const prefetchPokemon = usePrefetch("getPokemon")
    const prefetch = () => prefetchPokemon(name)

    return (
        <Link
            to={`/pokemon/${name}`}
            className={`c-pager__link c-pager__link--${direction}`}
            rel={direction}
            onMouseEnter={prefetch}
            onFocus={prefetch}
        >
            <svg className="c-pager__arrow" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path d={direction === "prev" ? "M12 4l-6 6 6 6" : "M8 4l6 6-6 6"} />
            </svg>
            <img src={getSpriteUrl(id)} alt="" width="48" height="48" loading="lazy" />
            <span className="c-pager__text">
                <span className="c-pager__label">
                    {direction === "prev" ? "Previous" : "Next"} · {formatId(id)}
                </span>
                <span className="c-pager__name">{formatName(name)}</span>
            </span>
        </Link>
    )
}

// Previous / next Pokémon in National Dex order.
function DetailPager({ prev, next }) {
    if (!prev && !next) return null

    return (
        <nav className="c-pager" aria-label="Previous and next Pokémon">
            {prev ? <PagerLink pokemon={prev} direction="prev" /> : <span />}
            {next && <PagerLink pokemon={next} direction="next" />}
        </nav>
    )
}

export default DetailPager
