import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { makeStore } from "../app/store"
import { routes } from "../app/routes"

// Renders the real route tree at `path` with an isolated store.
export function renderApp(path = "/", { preloadedState } = {}) {
    const store = makeStore(preloadedState)
    const router = createMemoryRouter(routes, { initialEntries: [path] })
    const user = userEvent.setup()

    render(
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>,
    )

    return { store, router, user }
}
