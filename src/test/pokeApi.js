import { vi } from "vitest"

// Minimal PokeAPI fakes. Each handler receives the request URL and returns
// a JSON body, or { status, body } for errors.
export function mockPokeApi(handlers) {
    const fetchMock = vi.fn(async (input) => {
        const url = new URL(typeof input === "string" ? input : input.url)
        const path = url.pathname.replace("/api/v2/", "")
        const handler = Object.entries(handlers).find(([pattern]) => new RegExp(`^${pattern}$`).test(path))

        if (!handler) {
            return new Response(JSON.stringify({ detail: "Not found" }), { status: 404 })
        }

        const result = await handler[1](url)
        const { status = 200, body = result } = result?.status ? result : {}
        return new Response(JSON.stringify(body), {
            status,
            headers: { "Content-Type": "application/json" },
        })
    })
    vi.stubGlobal("fetch", fetchMock)
    return fetchMock
}

export const requestedPaths = (fetchMock) =>
    fetchMock.mock.calls.map(([input]) => {
        const url = new URL(typeof input === "string" ? input : input.url)
        return url.pathname.replace("/api/v2/", "") + url.search
    })

const stat = (name, value) => ({ stat: { name }, base_stat: value, effort: 0 })

// A pokemon in PokeAPI's shape, with only the fields the UI reads.
export const makePokemon = ({ id, name, stats, types = ["normal"], moves = [] }) => ({
    id,
    name,
    height: 7,
    weight: 69,
    base_experience: 64,
    species: { url: `https://pokeapi.co/api/v2/pokemon-species/${id}/` },
    types: types.map((type) => ({ type: { name: type } })),
    abilities: [{ ability: { name: "overgrow" }, is_hidden: false }],
    stats: Object.entries(stats).map(([statName, value]) => stat(statName, value)),
    moves: moves.map((move) => ({
        move: { name: move },
        version_group_details: [
            {
                level_learned_at: 1,
                move_learn_method: { name: "level-up" },
                version_group: { name: "scarlet-violet" },
            },
        ],
    })),
    cries: {},
})

export const listPage = (offset, limit, count = 1351) => ({
    count,
    next: null,
    previous: null,
    results: Array.from({ length: Math.min(limit, count - offset) }, (_, index) => {
        const id = offset + index + 1
        return { name: `pokemon-${id}`, url: `https://pokeapi.co/api/v2/pokemon/${id}/` }
    }),
})
