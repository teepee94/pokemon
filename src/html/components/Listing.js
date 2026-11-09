import React, { useState, useEffect } from 'react'
import ListingItem from './ListingItem'
import "../../resources/sass/components/_components.listing.scss"
import "../../resources/sass/components/_components.pagination.scss"
import axios, { isCancel } from "../../resources/js/api/Axios"
import requests from '../../resources/js/api/Requests'
import { getIdFromUrl } from '../../resources/js/utils/getIdFromUrl'
import { formatGeneration } from '../../resources/js/utils/format'
import ArrowDown from '../../resources/icons/ArrowDownIcon'
import ArrowLeftIcon from '../../resources/icons/ArrowLeftIcon'
import ArrowRightIcon from '../../resources/icons/ArrowRightIcon'

const PAGE_SIZE = 20

// Reads offset/limit back out of a PokeAPI list URL so we can show "Page X of Y".
const getPageInfo = (url) => {
    const params = new URL(url, "https://pokeapi.co").searchParams
    const offset = Number(params.get("offset") ?? 0)
    const limit = Number(params.get("limit") ?? PAGE_SIZE)
    return { offset, limit }
}

function Listing({ endpoint = requests.pokemon }) {
    const [generations, setGenerations] = useState([])
    // What to show: either a page of the full list, or a whole generation.
    const [pageUrl, setPageUrl] = useState(endpoint)
    const [generationUrl, setGenerationUrl] = useState("")

    const [listingItems, setListingItems] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [nextRequest, setNextRequest] = useState(null)
    const [prevRequest, setPrevRequest] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        axios.get(requests.generation, { signal: controller.signal })
            .then(response => setGenerations(response.data.results))
            .catch(err => {
                // The filter is optional, so a failure here shouldn't block the list.
                if (!isCancel(err)) console.error(err)
            })

        return () => controller.abort()
    }, [])

    // A single effect owns the list. Changing page or filter aborts any
    // in-flight request, so a slow earlier response can never overwrite a
    // newer one.
    useEffect(() => {
        const controller = new AbortController()

        setIsLoading(true)
        setError(null)

        axios.get(generationUrl || pageUrl, { signal: controller.signal })
            .then(({ data }) => {
                if (generationUrl) {
                    // Generation species come back unordered and unpaginated.
                    const species = [...data.pokemon_species].sort(
                        (a, b) => getIdFromUrl(a.url) - getIdFromUrl(b.url)
                    )
                    setListingItems(species)
                    setTotalCount(species.length)
                    setNextRequest(null)
                    setPrevRequest(null)
                } else {
                    setListingItems(data.results)
                    setTotalCount(data.count)
                    setNextRequest(data.next)
                    setPrevRequest(data.previous)
                }
                setIsLoading(false)
            })
            .catch(err => {
                if (isCancel(err)) return
                setError(err)
                setIsLoading(false)
            })

        return () => controller.abort()
    }, [pageUrl, generationUrl])

    const goToPage = (url) => {
        setPageUrl(url)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const activeGeneration = generations.find(generation => generation.url === generationUrl)
    const { offset, limit } = getPageInfo(pageUrl)
    const currentPage = Math.floor(offset / limit) + 1
    const totalPages = Math.max(1, Math.ceil(totalCount / limit))

    let summary = ""
    if (!isLoading && !error) {
        summary = activeGeneration
            ? `${formatGeneration(activeGeneration.name)} · ${totalCount.toLocaleString()} Pokémon`
            : `Showing ${(offset + 1).toLocaleString()}–${Math.min(offset + limit, totalCount).toLocaleString()} of ${totalCount.toLocaleString()} Pokémon`
    }

    return (
        <section className="c-listing" aria-labelledby="listing-heading">
            <div className="container">
                <div className="c-listing__toolbar">
                    <div>
                        <h2 id="listing-heading" className="c-listing__title">
                            {activeGeneration ? formatGeneration(activeGeneration.name) : "All Pokémon"}
                        </h2>
                        <p className="c-listing__summary" aria-live="polite">{summary || " "}</p>
                    </div>
                    <div className="c-listing__filter">
                        <label htmlFor="filter" className="c-listing__filter-label">Generation</label>
                        <div className="c-selectbox">
                            <select
                                className="c-selectbox__select"
                                id="filter"
                                name="filter"
                                value={generationUrl}
                                onChange={e => setGenerationUrl(e.target.value)}
                            >
                                <option value="">All generations</option>
                                {generations.map(generation => (
                                    <option key={generation.name} value={generation.url}>{formatGeneration(generation.name)}</option>
                                ))}
                            </select>
                            <ArrowDown />
                        </div>
                    </div>
                </div>

                {error ? (
                    <div className="c-listing__message" role="alert">
                        <p>Sorry, we couldn't load the Pokémon. Please check your connection and try again.</p>
                    </div>
                ) : (
                    <ul className="c-listing__grid" aria-busy={isLoading}>
                        {isLoading
                            ? Array.from({ length: PAGE_SIZE }, (_, index) => (
                                <li key={index} className="c-card c-card--skeleton" aria-hidden="true">
                                    <div className="c-card__media" />
                                    <div className="c-card__body">
                                        <span className="c-card__skeleton-line c-card__skeleton-line--short" />
                                        <span className="c-card__skeleton-line" />
                                    </div>
                                </li>
                            ))
                            : listingItems.map(listingItem => (
                                <ListingItem key={listingItem.name} name={listingItem.name} id={getIdFromUrl(listingItem.url)} />
                            ))}
                    </ul>
                )}

                {!generationUrl && !error && (
                    <nav className="c-pagination" aria-label="Pagination">
                        <button
                            type="button"
                            onClick={() => goToPage(prevRequest)}
                            disabled={!prevRequest || isLoading}
                            className="c-pagination__btn"
                        >
                            <ArrowLeftIcon />
                            <span>Previous<span className="u-visually-hide"> page</span></span>
                        </button>
                        <span className="c-pagination__status">
                            Page <strong>{currentPage}</strong> of {totalPages}
                        </span>
                        <button
                            type="button"
                            onClick={() => goToPage(nextRequest)}
                            disabled={!nextRequest || isLoading}
                            className="c-pagination__btn"
                        >
                            <span>Next<span className="u-visually-hide"> page</span></span>
                            <ArrowRightIcon />
                        </button>
                    </nav>
                )}
            </div>
        </section>
    )
}

export default Listing
