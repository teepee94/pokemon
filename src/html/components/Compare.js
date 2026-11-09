import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromCompare, selectCompare } from '../../resources/js/redux/compareSlice';
import axios, { isCancel } from "../../resources/js/api/Axios"
import requests from '../../resources/js/api/Requests'
import "../../resources/sass/components/_components.compare.scss"

function Compare() {
	const dispatch = useDispatch()
	const compare = useSelector(selectCompare)

	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	// Fetch every selected pokemon in parallel and commit them in one update.
	// Depends only on `compare`, so it runs once per change to the selection
	// rather than re-triggering itself as results arrive.
	useEffect(() => {
		if (compare.length === 0) {
			setItems([])
			return
		}

		const controller = new AbortController()

		setIsLoading(true)
		setError(null)

		Promise.all(
			compare.map(name => axios.get(`${requests.pokemon}/${name}`, { signal: controller.signal }))
		)
			.then(responses => setItems(responses.map(response => response.data)))
			.catch(err => {
				if (!isCancel(err)) setError(err)
			})
			.finally(() => {
				if (!controller.signal.aborted) setIsLoading(false)
			})

		return () => controller.abort()
	}, [compare])

	if (compare.length === 0) {
		return (
			<div className="c-compare">
				<div className="container">
					<div className="row">
						<div className="c-compare__container">
							<div className="c-compare__title">No Pokémon have been selected</div>
							<Link to="/" className="c-compare__btn c-btn">Add Pokémon</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="c-compare">
			<div className="container">
				<div className="row">
					{error && <p role="alert">Sorry, we couldn't load these Pokémon. Please try again.</p>}
					{isLoading && <p aria-live="polite">Loading…</p>}
					{!isLoading && !error &&
					<div className="c-compare__items">
						{items.map(item => (
							<div key={item.id} className="c-compare__item">
								<h2 className="c-compare__item-title">{item.name}</h2>
								<button onClick={() => dispatch(removeFromCompare(item.name))} className="c-btn">
									Remove<span className="u-visually-hide"> {item.name}</span>
								</button>
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
											{item.stats.map(stat => (
												<React.Fragment key={stat.stat.name}>
													<li style={{marginTop: 10}}>Name: {stat.stat.name}</li>
													<li>Base stat: {stat.base_stat}</li>
													<li>Effort: {stat.effort}</li>
												</React.Fragment>
											))}
										</ul>
									</div>
								</div>
								<div className="c-compare__item-section">
									<h3 className="c-compare__item-section-title">Moves</h3>
									<div className="c-compare__item-section-content">
										<ul>
											{item.moves.map(move => (
												<li key={move.move.name}>{move.move.name}</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						))}
					</div>}
				</div>
			</div>
		</div>
	)
}

export default Compare
