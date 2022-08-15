import React from 'react'
import { useDispatch } from 'react-redux'
import { increment } from "../../resources/js/redux/compareSlice"
import { Link } from "react-router-dom";

function ListingItem(c) {
    const dispatch = useDispatch()

    const addToCompare = () => {
        dispatch(increment(c.title))
        alert('Added to compare, navigate to the compare page to view compared pokemon')
    }

    return (
        <div className={`c-listing__item ${c.class ? c.class : "" }`}>
            <Link to={`/pokemon/${c.title}`} className="c-listing__item-link">
                <div className="c-listing__item-media-container">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${c.image}.png`} className="c-listing__item-media" alt={c.title} loading="lazy" />
                </div>
                <h2 className="c-listing__item-title">{c.title}</h2>
            </Link>
            <button onClick={addToCompare} className="c-listing__item-btn c-btn c-btn--primary">compare</button>
        </div>
    )
}

export default ListingItem