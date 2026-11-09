import { configureStore } from "@reduxjs/toolkit"
import compareReducer from "../features/compare/compareSlice"
import userReducer from "../features/auth/userSlice"
import { pokemonApi } from "../features/pokemon/pokemonApi"
import { favouritesApi } from "../features/favourites/favouritesApi"
import { loadCompare, saveCompare } from "../features/compare/comparePersistence"

// A factory so tests can build an isolated store with their own state.
export function makeStore(preloadedState) {
    return configureStore({
        reducer: {
            compare: compareReducer,
            user: userReducer,
            [pokemonApi.reducerPath]: pokemonApi.reducer,
            [favouritesApi.reducerPath]: favouritesApi.reducer,
        },
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                // The API caches hold large plain-JSON responses (a single
                // pokemon has hundreds of move entries). Skipping them keeps
                // these development-only checks fast; they still cover the
                // app's own slices.
                serializableCheck: {
                    ignoredPaths: [pokemonApi.reducerPath, favouritesApi.reducerPath],
                    ignoredActions: [`${pokemonApi.reducerPath}/executeQuery/fulfilled`],
                },
                immutableCheck: { ignoredPaths: [pokemonApi.reducerPath, favouritesApi.reducerPath] },
            }).concat(pokemonApi.middleware, favouritesApi.middleware),
    })
}

export const store = makeStore({ compare: { compareItems: loadCompare() } })

// Persist the compare selection whenever it changes.
let savedCompare = store.getState().compare.compareItems
store.subscribe(() => {
    const { compareItems } = store.getState().compare
    if (compareItems !== savedCompare) {
        savedCompare = compareItems
        saveCompare(compareItems)
    }
})
