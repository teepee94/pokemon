import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit"
import { pokemonApi } from "./pokemonApi"

const { getPokemon } = pokemonApi.endpoints
const NO_RESULTS = []

// Subscribes to getPokemon for several names at once. Each pokemon is its own
// cache entry, shared with the detail page, so adding or removing one never
// refetches the others. Returns the per-name query results plus retry().
export function usePokemonList(names) {
    const dispatch = useDispatch()
    // A string key keeps the effect stable when callers pass a new array
    // with the same names.
    const key = names.join(",")

    useEffect(() => {
        const subscriptions = key ? key.split(",").map((name) => dispatch(getPokemon.initiate(name))) : []
        return () => subscriptions.forEach((subscription) => subscription.unsubscribe())
    }, [dispatch, key])

    const selectResults = useMemo(
        () =>
            key
                ? createSelector(
                      key.split(",").map((name) => getPokemon.select(name)),
                      (...results) => results,
                  )
                : () => NO_RESULTS,
        [key],
    )

    const results = useSelector(selectResults)

    // Re-request only the pokemon that failed.
    const retry = () =>
        results.forEach((result, index) => {
            if (result.isError)
                dispatch(getPokemon.initiate(names[index], { forceRefetch: true })).unsubscribe()
        })

    return { results, retry }
}
