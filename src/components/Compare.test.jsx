import { describe, expect, it } from "vitest"
import { screen, within } from "@testing-library/react"
import { renderApp } from "../test/render"
import { makePokemon, mockPokeApi, requestedPaths } from "../test/pokeApi"

const bulbasaur = makePokemon({
    id: 1,
    name: "bulbasaur",
    types: ["grass", "poison"],
    stats: { hp: 45, attack: 49 },
    moves: ["tackle", "growl", "vine-whip"],
})
const charmander = makePokemon({
    id: 4,
    name: "charmander",
    types: ["fire"],
    stats: { hp: 39, attack: 52 },
    moves: ["scratch", "growl", "ember"],
})

const preloadedState = {
    compare: {
        compareItems: [
            { name: "bulbasaur", id: 1 },
            { name: "charmander", id: 4 },
        ],
    },
}

const mockApi = () =>
    mockPokeApi({
        "pokemon/bulbasaur": () => bulbasaur,
        "pokemon/charmander": () => charmander,
    })

const rowFor = (label) => screen.getByRole("rowheader", { name: label }).closest("tr")

describe("Compare", () => {
    it("lines pokemon up side by side and highlights the best value per row", async () => {
        mockApi()
        renderApp("/compare", { preloadedState })

        expect(await screen.findByRole("link", { name: "Bulbasaur" })).toBeInTheDocument()
        expect(await screen.findByRole("link", { name: "Charmander" })).toBeInTheDocument()

        const hpBest = rowFor("HP").querySelector(".is-best")
        expect(hpBest).toHaveTextContent("45")
        expect(within(hpBest).getByText("(highest)")).toBeInTheDocument()

        expect(rowFor("Attack").querySelector(".is-best")).toHaveTextContent("52")
        expect(rowFor("Total").querySelector(".is-best")).toHaveTextContent("94")
    })

    it("summarises shared moves instead of listing everything", async () => {
        mockApi()
        renderApp("/compare", { preloadedState })

        expect(await screen.findByText("1 moves shared by all")).toBeInTheDocument()
    })

    it("fetches each pokemon once and doesn't refetch the rest when one is removed", async () => {
        const fetchMock = mockApi()
        const { store, user } = renderApp("/compare", { preloadedState })

        await screen.findByRole("link", { name: "Charmander" })
        await user.click(screen.getByRole("button", { name: "Remove Charmander" }))

        expect(screen.queryByRole("link", { name: "Charmander" })).not.toBeInTheDocument()
        expect(screen.getByRole("link", { name: "Bulbasaur" })).toBeInTheDocument()
        expect(store.getState().compare.compareItems).toEqual([{ name: "bulbasaur", id: 1 }])
        expect(requestedPaths(fetchMock).sort()).toEqual(["pokemon/bulbasaur", "pokemon/charmander"])
    })

    it("shows an empty state when nothing is selected", async () => {
        mockApi()
        renderApp("/compare")

        expect(await screen.findByRole("heading", { name: "Nothing to compare yet" })).toBeInTheDocument()
    })
})
