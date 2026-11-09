import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getIdFromUrl } from "../../utils/getIdFromUrl"

export const PAGE_SIZE = 20

// PokeAPI data is effectively static, so keep it cached for an hour after the
// last component stops using it. Navigating back to a page is then instant.
const ONE_HOUR = 60 * 60

export const pokemonApi = createApi({
    reducerPath: "pokemonApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
    keepUnusedDataFor: ONE_HOUR,
    endpoints: (build) => ({
        // One page of the National Dex, as { count, results: [{ name, id }] }.
        getPokemonPage: build.query({
            query: ({ offset, limit = PAGE_SIZE }) => ({ url: "pokemon", params: { offset, limit } }),
            transformResponse: (response) => ({
                count: response.count,
                results: response.results.map(({ name, url }) => ({ name, id: Number(getIdFromUrl(url)) })),
            }),
        }),

        getGenerations: build.query({
            query: () => "generation",
            transformResponse: (response) =>
                response.results.map(({ name, url }) => ({ name, id: Number(getIdFromUrl(url)) })),
        }),

        // Every species introduced in a generation, in Pokédex order.
        getGeneration: build.query({
            query: (id) => `generation/${id}`,
            transformResponse: (response) =>
                response.pokemon_species
                    .map(({ name, url }) => ({ name, id: Number(getIdFromUrl(url)) }))
                    .sort((a, b) => a.id - b.id),
        }),

        getPokemon: build.query({
            query: (nameOrId) => `pokemon/${encodeURIComponent(String(nameOrId).toLowerCase())}`,
        }),

        getSpecies: build.query({
            query: (id) => `pokemon-species/${id}`,
        }),
    }),
})

export const {
    useGetPokemonPageQuery,
    useGetGenerationsQuery,
    useGetGenerationQuery,
    useGetPokemonQuery,
    useGetSpeciesQuery,
    usePrefetch,
} = pokemonApi
