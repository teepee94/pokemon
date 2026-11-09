import { Navigate } from "react-router-dom"
import RootLayout from "./RootLayout"
import ErrorPage from "./ErrorPage"
import PokedexPage from "../pages/PokedexPage"

// The landing page ships in the main bundle; the others load on demand.
const lazyPage = (load) => async () => ({ Component: (await load()).default })

// Exported separately from the browser router so tests can mount the same
// tree in a memory router.
export const routes = [
    {
        path: "/",
        element: <RootLayout />,
        // Shown while a lazy page's code loads on a direct visit.
        hydrateFallbackElement: <div className="c-route-loading" aria-busy="true" />,
        // Catches render errors in any page as well as unknown URLs (404).
        errorElement: <ErrorPage />,
        children: [
            {
                errorElement: <ErrorPage inLayout />,
                children: [
                    { index: true, element: <PokedexPage /> },
                    { path: "pokemon/:name", lazy: lazyPage(() => import("../pages/PokemonPage")) },
                    { path: "compare", lazy: lazyPage(() => import("../pages/ComparePage")) },
                    { path: "favourites", lazy: lazyPage(() => import("../pages/FavouritesPage")) },
                    { path: "account", element: <Navigate to="/favourites" replace /> },
                    { path: "*", element: <ErrorPage notFound inLayout /> },
                ],
            },
        ],
    },
]
