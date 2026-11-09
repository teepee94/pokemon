import React, { useState, useEffect } from 'react'
import ListingItem from './ListingItem'
import "../../resources/sass/components/_components.listing.scss"
import axios, { isCancel } from "../../resources/js/api/Axios"
import requests from '../../resources/js/api/Requests'
import { getIdFromUrl } from '../../resources/js/utils/getIdFromUrl'
import ArrowDown from '../../resources/icons/ArrowDownIcon'
import ArrowLeftIcon from '../../resources/icons/ArrowLeftIcon'
import ArrowRightIcon from '../../resources/icons/ArrowRightIcon'
import "../../resources/sass/components/_components.pagination.scss"

function Listing(c) {
    const [generations, setGenerations] = useState([])
    // What to show: either a page of the full list, or a whole generation.
    const [pageUrl, setPageUrl] = useState(c.endpoint ?? requests.pokemon)
    const [generationUrl, setGenerationUrl] = useState("")

    const [listingItems, setListingItems] = useState([])
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
                    setNextRequest(null)
                    setPrevRequest(null)
                } else {
                    setListingItems(data.results)
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

    const filterLabel = generationUrl
        ? `Generation ${getIdFromUrl(generationUrl)}`
        : "No filter selected"

    return (
        <>
        <div className={`c-listing ${c.class ? c.class : "" }`}>
            <div className="container">
                {c.header ?
                <div className="row">
                    <div className="c-listing__header">
                        <h2 className="c-listing__header-title">{c.header} {filterLabel}</h2>
                        <div className="c-listing__header-filter">
                            <div className="c-selectbox">
                                <label htmlFor="filter" className="u-visually-hide">Filter by generation</label>
                                <select className="c-selectbox__select" id="filter" name="filter" value={generationUrl} onChange={e => setGenerationUrl(e.target.value)}>
                                    <option value="">All generations</option>
                                    {generations.map(generation => (
                                        <option key={generation.name} value={generation.url}>{generation.name}</option>
                                    ))}
                                </select>
                                <ArrowDown />
                            </div>
                        </div>
                    </div>
                </div> : ""
                }
                <div className="row" aria-busy={isLoading}>
                    {error && <p role="alert">Sorry, we couldn't load the Pokémon. Please try again.</p>}
                    {!error && listingItems.map(listingItem => (
                        <ListingItem key={listingItem.name} title={listingItem.name} image={getIdFromUrl(listingItem.url)} />
                    ))}
                </div>
            </div>
        </div>
        {!generationUrl &&
        <nav className={`c-pagination ${c.class ? c.class : "" }`} aria-labelledby="label-pagination">
            <div className="container">
                <div className="row">
                    <span className="u-visually-hide" id="label-pagination">Pagination</span>
                    <div className="c-pagination__container">
                        <ol className="c-pagination__items">
                            <li className="c-pagination__item c-pagination__item--prev">
                                <button onClick={() => setPageUrl(prevRequest)} disabled={!prevRequest || isLoading} className="c-pagination__link">
                                    <ArrowLeftIcon />
                                    <span className="u-visually-hide">Go to</span><span className="c-pagination__link-text"> Previous </span><span className="u-visually-hide">page</span>
                                </button>
                            </li>
                            <li className="c-pagination__item c-pagination__item--next">
                                <button onClick={() => setPageUrl(nextRequest)} disabled={!nextRequest || isLoading} className="c-pagination__link">
                                    <span className="u-visually-hide">Go to</span><span className="c-pagination__link-text"> Next </span><span className="u-visually-hide">page</span>
                                    <ArrowRightIcon />
                                </button>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </nav>}
        </>
    )
}

export default Listing
