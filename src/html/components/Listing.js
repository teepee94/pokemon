import React, { useState, useEffect } from 'react'
import ListingItem from './ListingItem'
import "../../resources/sass/components/_components.listing.scss"
import axios from "../../resources/js/api/Axios"

function Listing(c) {

    const [listingItems, setListingItems] = useState([]);

	useEffect(() => {
		async function getListingItems() {
			const request = await axios.get(c.endpoint);

			setListingItems(request.data.results);

			return request;
		}

		getListingItems();
	}, [])

    console.log(listingItems);

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
                        <h2 className="c-listing__header-title">{c.header}</h2>
                        <a href="" className="c-listing__header-link c-btn c-btn--small">View all</a>
                    </div>
                </div> : ""
                }
                <div className="row">
                    {listingItems.map((listingItem, index) => (
                        <ListingItem key={listingItem.index} title={listingItem.name} image={listingItem.url.split('/')[listingItem.url.split('/').length - 2]} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Listing