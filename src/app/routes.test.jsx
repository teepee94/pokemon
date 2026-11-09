import { describe, expect, it } from "vitest"
import { screen } from "@testing-library/react"
import { renderApp } from "../test/render"
import { mockPokeApi } from "../test/pokeApi"

describe("routes", () => {
    it("renders a 404 page inside the layout for unknown URLs", async () => {
        mockPokeApi({})
        renderApp("/definitely-not-a-page")

        expect(await screen.findByRole("heading", { name: "Page not found" })).toBeInTheDocument()
        expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: "Back to the Pokédex" })).toHaveAttribute("href", "/")
    })

    it("redirects the old /account URL to /favourites", async () => {
        mockPokeApi({})
        const { router } = renderApp("/account")

        expect(
            await screen.findByRole("heading", { name: "Sign in to see your favourites" }),
        ).toBeInTheDocument()
        expect(router.state.location.pathname).toBe("/favourites")
    })

    it("shows a not-found message for an unknown pokemon", async () => {
        mockPokeApi({})
        renderApp("/pokemon/missingno")

        expect(await screen.findByRole("heading", { name: "Pokémon not found" })).toBeInTheDocument()
        expect(screen.getByText(/couldn't find a Pokémon called “missingno”/)).toBeInTheDocument()
    })
})
