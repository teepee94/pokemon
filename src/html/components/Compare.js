import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCompare } from '../../resources/js/redux/compareSlice';
import axios from "../../resources/js/api/Axios"
import requests from '../../resources/js/api/Requests'
import "../../resources/sass/components/_components.compare.scss"


function Compare() {

    const [items, setItems] = useState([])

    const compare = useSelector(selectCompare);

    useEffect(() => {
		async function getItemData(name) {
			await axios.get(`${requests.pokemon}/${name}`)
			.then((request) => {
	
				setItems([...items, request.data]);
	
				return request;
			}).catch(err => alert(err));
		}

		if(compare.length > items.length) {
			compare.map(c => (
				getItemData(c)
			))
		}
	}, [compare, items])
	

    return (
        <div className="c-compare">
            <div className="container">
                <div className="row">
					{items.length > 0 ?
					<div className="c-compare__items">
						{items.map((item, index) => (
							<div key={index} className="c-compare__item">
								<h2 className="c-compare__item-title">{item.name}</h2>
								<div className="c-compare__item-section">
									<h3 className="c-compare__item-section-title">Height</h3>
									<div className="c-compare__item-section-content">{item.height}</div>
								</div>
								<div className="c-compare__item-section">
									<h3 className="c-compare__item-section-title">Weight</h3>
									<div className="c-compare__item-section-content">{item.weight}</div>
								</div>
								<div className="c-compare__item-section">
									<h3 className="c-compare__item-section-title">Stats</h3>  
									<div className="c-compare__item-section-content">
										<ul>
											{item.stats.map((stat, index) => (
												<>
												<li style={{marginTop: 10}} key={index+1*9997}>Name: {stat.stat.name}</li>
												<li key={index+1*9998}>Base stat: {stat.base_stat}</li>
												<li key={index+1*9999}>Effort: {stat.effort}</li>
												</> 
											))}
										</ul>
									</div>
								</div>
								<div className="c-compare__item-section">
									<h3 className="c-compare__item-section-title">Moves</h3>
									<div className="c-compare__item-section-content">
										<ul>
											{item.moves.map((move, index) => (
												<li key={index*2*9997}>{move.move.name}</li>
											))}
										</ul>
									</div> 
								</div>
							</div>
						))}
					</div>
					:
					<div className="c-compare__container">
						<div className="c-compare__title">No pokem have been selected</div>
						<a href="/" className="c-compare__btn c-btn">Add pokemon</a>
					</div>}
                </div>
            </div>
        </div>
    )
}

export default Compare