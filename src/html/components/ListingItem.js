import React from 'react'

function ListingItem(c) {
    return (
        <div className={`c-listing__item ${c.class ? c.class : "" }`}>
            <a href={`/pokemon/${c.title}`} className="c-listing__item-link">
                <div className="c-listing__item-media-container">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${c.image}.png`} className="c-listing__item-media" alt={c.title} loading="lazy" />
                </div>
                <h2 className="c-listing__item-title">{c.title}</h2>
                <p className="c-listing__item-summary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum scelerisque ex. Pellentesque feugiat id felis at ornare. Ut porta orci quis rutrum eleifend.</p>
            </a>
        </div>
    )
}

export default ListingItem