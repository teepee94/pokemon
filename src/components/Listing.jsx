import { Link, useSearchParams } from "react-router-dom"
import { skipToken } from "@reduxjs/toolkit/query"
import ListingItem from "./ListingItem"
import ArrowDown from "./icons/ArrowDownIcon"
import ArrowLeftIcon from "./icons/ArrowLeftIcon"
import ArrowRightIcon from "./icons/ArrowRightIcon"
import "../styles/components/_components.listing.scss"
import "../styles/components/_components.pagination.scss"
import {
    PAGE_SIZE,
    useGetGenerationQuery,
    useGetGenerationsQuery,
    useGetPokemonPageQuery,
    usePrefetch,
} from "../features/pokemon/pokemonApi"
import { formatGeneration } from "../utils/format"

// "3" -> 3; anything else (missing, "abc", "-1", "2.5") -> null
const parsePositiveInt = (value) => {
    const number = Number(value)
    return Number.isInteger(number) && number > 0 ? number : null
}

function SkeletonGrid() {
    return (
        <ul className="c-listing__grid" aria-hidden="true">
            {Array.from({ length: PAGE_SIZE }, (_, index) => (
                <li key={index} className="c-card c-card--skeleton">
                    <div className="c-card__media" />
                    <div className="c-card__body">
                        <span className="c-card__skeleton-line c-card__skeleton-line--short" />
                        <span className="c-card__skeleton-line" />
                    </div>
                </li>
            ))}
        </ul>
    )
}

// The page and generation filter live in the URL, so every view can be
// shared and the back button behaves. Data comes from RTK Query, so
// revisiting a page is served from cache.
function Listing() {
    const [searchParams, setSearchParams] = useSearchParams()
    const generationId = parsePositiveInt(searchParams.get("generation"))
    const page = parsePositiveInt(searchParams.get("page")) ?? 1
    const offset = (page - 1) * PAGE_SIZE

    const { data: generations = [] } = useGetGenerationsQuery()
    const pageQuery = useGetPokemonPageQuery(generationId ? skipToken : { offset })
    const generationQuery = useGetGenerationQuery(generationId ?? skipToken)
    const prefetchPage = usePrefetch("getPokemonPage")

    const query = generationId ? generationQuery : pageQuery
    // currentData is undefined while new arguments load, so we show skeletons
    // rather than the previous page's results.
    const items = (generationId ? query.currentData : query.currentData?.results) ?? []
    const totalCount = generationId ? items.length : (pageQuery.data?.count ?? 0)
    const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
    const isLoading = query.isFetching && !query.currentData

    const activeGeneration = generations.find((generation) => generation.id === generationId)
    const title = activeGeneration ? formatGeneration(activeGeneration.name) : "All Pokémon"
    const isPastEnd = !generationId && query.currentData && page > totalPages

    let summary = " "
    if (query.currentData && !isPastEnd) {
        summary = generationId
            ? `${totalCount.toLocaleString()} Pokémon`
            : `Showing ${(offset + 1).toLocaleString()}–${Math.min(offset + PAGE_SIZE, totalCount).toLocaleString()} of ${totalCount.toLocaleString()} Pokémon`
    }

    const changeGeneration = (event) => {
        const { value } = event.target
        setSearchParams(value ? { generation: value } : {})
    }

    const pageLink = (target) => (target === 1 ? "/" : `/?page=${target}`)
    const prefetch = (target) => () => prefetchPage({ offset: (target - 1) * PAGE_SIZE })

    let content
    if (query.isError) {
        content = (
            <div className="c-listing__message" role="alert">
                <p>Sorry, we couldn't load the Pokémon. Please check your connection and try again.</p>
                <button type="button" className="c-btn c-btn--primary" onClick={query.refetch}>
                    Try again
                </button>
            </div>
        )
    } else if (isLoading) {
        content = <SkeletonGrid />
    } else if (isPastEnd) {
        content = (
            <div className="c-listing__message">
                <p>
                    There's no page {page}. The Pokédex has {totalPages} pages.
                </p>
                <Link to="/" className="c-btn c-btn--primary">
                    Go to page 1
                </Link>
            </div>
        )
    } else {
        content = (
            <ul className="c-listing__grid">
                {items.map((pokemon) => (
                    <ListingItem key={pokemon.name} name={pokemon.name} id={pokemon.id} />
                ))}
            </ul>
        )
    }

    const hasPrev = page > 1 && !isPastEnd
    const hasNext = page < totalPages

    return (
        <section className="c-listing" aria-labelledby="listing-heading" aria-busy={isLoading}>
            <div className="container">
                <div className="c-listing__toolbar">
                    <div>
                        <h2 id="listing-heading" className="c-listing__title">
                            {title}
                        </h2>
                        <p className="c-listing__summary" aria-live="polite">
                            {summary}
                        </p>
                    </div>
                    <div className="c-listing__filter">
                        <label htmlFor="generation-filter" className="c-listing__filter-label">
                            Generation
                        </label>
                        <div className="c-selectbox">
                            <select
                                className="c-selectbox__select"
                                id="generation-filter"
                                value={generationId ?? ""}
                                onChange={changeGeneration}
                            >
                                <option value="">All generations</option>
                                {generations.map((generation) => (
                                    <option key={generation.id} value={generation.id}>
                                        {formatGeneration(generation.name)}
                                    </option>
                                ))}
                            </select>
                            <ArrowDown />
                        </div>
                    </div>
                </div>

                {content}

                {!generationId && !query.isError && query.currentData && !isPastEnd && (
                    <nav className="c-pagination" aria-label="Pagination">
                        {hasPrev ? (
                            <Link
                                to={pageLink(page - 1)}
                                className="c-pagination__btn"
                                rel="prev"
                                aria-label="Previous page"
                                onMouseEnter={prefetch(page - 1)}
                                onFocus={prefetch(page - 1)}
                            >
                                <ArrowLeftIcon />
                                <span>Previous</span>
                            </Link>
                        ) : (
                            <span className="c-pagination__btn is-disabled" aria-hidden="true">
                                <ArrowLeftIcon />
                                <span>Previous</span>
                            </span>
                        )}
                        <span className="c-pagination__status" aria-current="page">
                            Page <strong>{page}</strong> of {totalPages}
                        </span>
                        {hasNext ? (
                            <Link
                                to={pageLink(page + 1)}
                                className="c-pagination__btn"
                                rel="next"
                                aria-label="Next page"
                                onMouseEnter={prefetch(page + 1)}
                                onFocus={prefetch(page + 1)}
                            >
                                <span>Next</span>
                                <ArrowRightIcon />
                            </Link>
                        ) : (
                            <span className="c-pagination__btn is-disabled" aria-hidden="true">
                                <span>Next</span>
                                <ArrowRightIcon />
                            </span>
                        )}
                    </nav>
                )}
            </div>
        </section>
    )
}

export default Listing
