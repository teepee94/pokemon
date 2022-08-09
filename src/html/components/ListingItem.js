import React from 'react'

function ListingItem(c) {
    return (
        <div className={`c-listing__item ${c.class ? c.class : "" }`}>
            <a href="" className="c-listing__item-link">
                <div className="c-listing__item-media-container">
                    <img src={`/resources/images/test/${c.image}?width=50`} className="c-listing__item-media" alt="Placeholder image" loading="lazy" />
                </div>
                <h2 className="c-listing__item-title">{c.title}</h2>
                <p className="c-listing__item-summary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum scelerisque ex. Pellentesque feugiat id felis at ornare. Ut porta orci quis rutrum eleifend.</p>
            </a>
        </div>
    )
}

export default ListingItem