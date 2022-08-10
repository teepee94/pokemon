import React, { useState, useEffect } from 'react'
import ListingItem from './ListingItem'
import "../../resources/sass/components/_components.listing.scss"
import axios from "../../resources/js/api/Axios"
import requests from '../../resources/js/api/Requests'
import ArrowDown from '../../resources/icons/ArrowDownIcon'

function Listing(c) {

    const [listingItems, setListingItems] = useState([])
    const [generations, setGenerations] = useState([])
    const [selected, setSelected] = useState("")

	useEffect(() => {
		async function getListingItems() {
			const request = await axios.get(requests.pokemon);

			setListingItems(request.data.results);

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

            console.log(request.data)

			return request;
		}

        if(selected != "") {
            getGenerationItems(selected.slice(-2));
        }

    }, [selected])
    


  return (
        <div className={`c-listing ${c.class ? c.class : "" }`}>
            <div className="container">
                {c.filtered ?
                <div className="row">
                    <div className="c-listing__filtered">
                        <div className="c-listing__filtered-wrapper">
                            <div className="c-listing__filtered-label">Showing posts in the category '<span>Category</span>'</div>
                            <a href="" className="c-listing__filtered-link c-btn c-btn--small">Show all posts</a>
                        </div>
                    </div>
                </div> : ""
                }
                {c.header ?
                <div className="row">
                    <div className="c-listing__header">
                        <h2 className="c-listing__header-title">{c.header} {selected}</h2>
                        <div className="c-form__select-field">
                            <label htmlFor="filter" className="c-form__label">Filter</label>
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
    )
}

export default Listing