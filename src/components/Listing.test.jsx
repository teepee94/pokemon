import { describe, expect, it } from "vitest"
import { screen, waitFor, within } from "@testing-library/react"
import { renderApp } from "../test/render"
import { listPage, mockPokeApi, requestedPaths } from "../test/pokeApi"

const generations = {
    count: 2,
    results: [
        { name: "generation-i", url: "https://pokeapi.co/api/v2/generation/1/" },
        { name: "generation-ii", url: "https://pokeapi.co/api/v2/generation/2/" },
    ],
}

const mockApi = () =>
    mockPokeApi({
        pokemon: (url) =>
            listPage(Number(url.searchParams.get("offset")), Number(url.searchParams.get("limit"))),
        generation: () => generations,
        "generation/1": () => ({
            pokemon_species: [
                { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon-species/3/" },
                { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon-species/1/" },
                { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon-species/2/" },
            ],
        }),
    })

const cardNames = () =>
    within(document.querySelector(".c-listing__grid"))
        .getAllByRole("link")
        .map((link) => link.textContent)

describe("Listing", () => {
    it("reads the page from the URL and requests the matching offset", async () => {
        const fetchMock = mockApi()
        renderApp("/?page=3")

        expect(await screen.findByText("#0041")).toBeInTheDocument()
        expect(screen.getByText(/Page/)).toHaveTextContent("Page 3 of 68")
        expect(requestedPaths(fetchMock)).toContain("pokemon?offset=40&limit=20")
        expect(screen.getByRole("link", { name: /previous page/i })).toHaveAttribute("href", "/?page=2")
        expect(screen.getByRole("link", { name: /next page/i })).toHaveAttribute("href", "/?page=4")
    })

    it("has no previous link on the first page", async () => {
        mockApi()
        renderApp("/")

        await screen.findByText("#0001")
        expect(screen.queryByRole("link", { name: /previous page/i })).not.toBeInTheDocument()
    })

    it("navigates with the URL and serves revisited pages from cache", async () => {
        const fetchMock = mockApi()
        const { router, user } = renderApp("/")

        await screen.findByText("#0001")
        await user.click(screen.getByRole("link", { name: /next page/i }))

        expect(await screen.findByText("#0021")).toBeInTheDocument()
        expect(router.state.location.search).toBe("?page=2")

        await router.navigate(-1)
        expect(await screen.findByText("#0001")).toBeInTheDocument()

        const firstPageRequests = requestedPaths(fetchMock).filter(
            (path) => path === "pokemon?offset=0&limit=20",
        )
        expect(firstPageRequests).toHaveLength(1)
    })

    it("explains when the page number is past the end", async () => {
        mockApi()
        renderApp("/?page=999")

        expect(await screen.findByText("There's no page 999. The Pokédex has 68 pages.")).toBeInTheDocument()
        expect(screen.getByRole("link", { name: "Go to page 1" })).toHaveAttribute("href", "/")
    })

    it("treats an invalid page parameter as page 1", async () => {
        const fetchMock = mockApi()
        renderApp("/?page=-4")

        await screen.findByText("#0001")
        expect(requestedPaths(fetchMock)).toContain("pokemon?offset=0&limit=20")
    })

    it("filters by generation via the URL, in Pokédex order, without pagination", async () => {
        mockApi()
        const { router, user } = renderApp("/")

        await screen.findByText("#0001")
        await screen.findByRole("option", { name: "Generation I" })
        await user.selectOptions(screen.getByLabelText("Generation"), "1")

        expect(await screen.findByRole("heading", { name: "Generation I" })).toBeInTheDocument()
        await waitFor(() => expect(cardNames()).toEqual(["Bulbasaur", "Ivysaur", "Venusaur"]))
        expect(router.state.location.search).toBe("?generation=1")
        expect(screen.queryByRole("navigation", { name: "Pagination" })).not.toBeInTheDocument()
    })
})
