import { useEffect, useState } from 'react'
import axios, { isCancel } from './Axios'
import requests from './Requests'

// Alternate forms (megas, regional variants) have ids from 10001 upwards and
// don't sit in the numbered Pokédex order, so they get no prev/next links.
const FORM_ID_START = 10000

const getNeighbours = (id, results) => {
	if (id <= 1) return { prev: null, next: results[1] ?? null }
	return { prev: results[0] ?? null, next: results[2] ?? null }
}

// Loads a pokemon, then its species details and Pokédex neighbours in
// parallel. The pokemon renders as soon as it arrives; species and
// neighbours are progressive enhancements and never fail the page.
export function usePokemonDetail(name) {
	const [pokemon, setPokemon] = useState(null)
	const [species, setSpecies] = useState(null)
	const [neighbours, setNeighbours] = useState({ prev: null, next: null })
	const [error, setError] = useState(null)

	useEffect(() => {
		const controller = new AbortController()
		const { signal } = controller

		// Clear the previous pokemon so its data never shows under a new name.
		setPokemon(null)
		setSpecies(null)
		setNeighbours({ prev: null, next: null })
		setError(null)

		axios.get(`${requests.pokemon}/${encodeURIComponent(name)}`, { signal })
			.then(({ data }) => {
				setPokemon(data)

				axios.get(data.species.url, { signal })
					.then(response => setSpecies(response.data))
					.catch(err => { if (!isCancel(err)) console.error(err) })

				if (data.id < FORM_ID_START) {
					const offset = Math.max(0, data.id - 2)
					const limit = data.id === 1 ? 2 : 3

					axios.get(requests.pokemon, { params: { offset, limit }, signal })
						.then(response => setNeighbours(getNeighbours(data.id, response.data.results)))
						.catch(err => { if (!isCancel(err)) console.error(err) })
				}
			})
			.catch(err => {
				if (!isCancel(err)) setError(err)
			})

		return () => controller.abort()
	}, [name])

	return { pokemon, species, neighbours, error }
}
