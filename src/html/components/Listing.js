import React, { useState, useEffect } from 'react'
import ListingItem from './ListingItem'
import "../../resources/sass/components/_components.listing.scss"
import axios from "../../resources/js/api/Axios"
import requests from '../../resources/js/api/Requests'
import ArrowDown from '../../resources/icons/ArrowDownIcon'
import ArrowLeftIcon from '../../resources/icons/ArrowLeftIcon'
import ArrowRightIcon from '../../resources/icons/ArrowRightIcon'
import "../../resources/sass/components/_components.pagination.scss"

function Listing(c) {

    const [listingItems, setListingItems] = useState([])
    const [generations, setGenerations] = useState([])
    const [selected, setSelected] = useState("")
    const [nextRequest, setNextRequest] = useState("")
    const [prevRequest, setPrevRequest] = useState("")

	useEffect(() => {
		async function getListingItems() {
			const request = await axios.get(requests.pokemon);

			setListingItems(request.data.results)
            setNextRequest(request.data.next)
            setPrevRequest(request.data.previous)

			return request;
		}

		getListingItems();

        async function getGenerations() {
			const request = await axios.get(requests.generation);

			setGenerations(request.data.results);

			return request;
		}

		getGenerations();
	}, [])

    useEffect(() => {
        async function getGenerationItems(id) {
			const request = await axios.get(`${requests.generation}/${id}`);

			setListingItems(request.data.pokemon_species);

			return request;
		}

        if(selected !== "") {
            getGenerationItems(selected.slice(-2));
        }

    }, [selected])

    async function getPaginatedItems(requestUrl) {
        const request = await axios.get(requestUrl);

        setListingItems(request.data.results);
        setNextRequest(request.data.next)
        setPrevRequest(request.data.previous)

        return request;
    }

    const prevPage = () => {
		getPaginatedItems(prevRequest);
    }

    const nextPage = () => {
        getPaginatedItems(nextRequest);
    }


  return (
        <>
        <div className={`c-listing ${c.class ? c.class : "" }`}>
            <div className="container">
                {c.header ?
                <div className="row">
                    <div className="c-listing__header">
                        <h2 className="c-listing__header-title">{c.header} {selected ? `Generation ${selected.split('/').length - 2}` : "No filter selected"}</h2>
                        <div className="c-listing__header-filter">
                            <div className="c-selectbox">
                                <select className="c-selectbox__select" id="filter" name="filter" required onChange={e => setSelected(e.target.value)}>
                                    <option value="">Filter</option>
                                    {generations?.map((generation, index) => (
                                        <option key={index} value={generation.url}>{generation.name}</option> 
                                    ))}
                                </select>
                                <ArrowDown />
                            </div>
                        </div>
                    </div>
                </div> : ""
                }
                <div className="row">
                    {listingItems.map((listingItem, index) => (
                        <ListingItem key={index} title={listingItem.name} image={listingItem.url.split('/')[listingItem.url.split('/').length - 2]} />
                    ))}
                </div>
            </div>
        </div>
        <nav className={`c-pagination ${c.class ? c.class : "" }`}>
            <div className="container">
                <div className="row">
                    <span className="u-visually-hide" id="label-pagination">Pagination</span>
                    <div className="c-pagination__container" aria-labelledby="label-pagination">
                        <ol className="c-pagination__items">
                            <li className="c-pagination__item c-pagination__item--prev">
                                <button onClick={prevPage} className="c-pagination__link">
                                    <ArrowLeftIcon />
                                    <span className="u-visually-hide">Go to</span><span className="c-pagination__link-text"> Previous </span><span className="u-visually-hide">page</span>
                                </button>
                            </li>
                            <li className="c-pagination__item c-pagination__item--next">
                                <button onClick={nextPage} className="c-pagination__link">
                                    <span className="u-visually-hide">Go to</span><span className="c-pagination__link-text"> Next </span><span className="u-visually-hide">page</span>
                                    <ArrowRightIcon />
                                </button>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Listing