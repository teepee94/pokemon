import { beforeEach, describe, expect, it, vi } from "vitest"
import { makeStore } from "../../app/store"
import { favouritesApi } from "./favouritesApi"

// An in-memory stand-in for the slice of the Firestore SDK the API uses.
const firestore = vi.hoisted(() => ({
    docs: new Map(),
    failWrites: false,
}))

vi.mock("../../lib/firestore", () => ({
    loadFirestore: async () => ({
        db: {},
        collection: (db, ...path) => path.join("/"),
        doc: (collectionPath, name) => `${collectionPath}/${name}`,
        getDocs: async (collectionPath) => ({
            docs: [...firestore.docs]
                .filter(([path]) => path.startsWith(`${collectionPath}/`))
                .map(([path, data]) => ({ id: path.split("/").pop(), data: () => data })),
        }),
        setDoc: async (path, data) => {
            if (firestore.failWrites) throw new Error("permission-denied")
            firestore.docs.set(path, data)
        },
        deleteDoc: async (path) => {
            if (firestore.failWrites) throw new Error("permission-denied")
            firestore.docs.delete(path)
        },
    }),
}))

const { getFavourites, addFavourite, removeFavourite } = favouritesApi.endpoints

const setup = async () => {
    const store = makeStore()
    store.dispatch(getFavourites.initiate("user-1"))
    await vi.waitFor(() => expect(getFavourites.select("user-1")(store.getState()).isSuccess).toBe(true))
    const favourites = () => getFavourites.select("user-1")(store.getState()).data
    return { store, favourites }
}

describe("favouritesApi", () => {
    beforeEach(() => {
        firestore.docs = new Map([["pokemon/user-1/favourites/charmander", { id: 4 }]])
        firestore.failWrites = false
    })

    it("loads a user's favourites in Pokédex order", async () => {
        firestore.docs.set("pokemon/user-1/favourites/bulbasaur", { id: 1 })
        firestore.docs.set("pokemon/user-2/favourites/pikachu", { id: 25 })
        const { favourites } = await setup()

        expect(favourites()).toEqual([
            { name: "bulbasaur", id: 1 },
            { name: "charmander", id: 4 },
        ])
    })

    it("adds optimistically, before the write finishes", async () => {
        const { store, favourites } = await setup()

        const pending = store.dispatch(addFavourite.initiate({ uid: "user-1", name: "bulbasaur", id: 1 }))
        expect(favourites().map((favourite) => favourite.name)).toEqual(["bulbasaur", "charmander"])

        await pending
        expect(firestore.docs.get("pokemon/user-1/favourites/bulbasaur")).toEqual({ id: 1 })
    })

    it("rolls the cache back when a write is rejected", async () => {
        firestore.failWrites = true
        const { store, favourites } = await setup()

        const result = await store.dispatch(
            removeFavourite.initiate({ uid: "user-1", name: "charmander", id: 4 }),
        )

        expect(result.error).toBeDefined()
        expect(favourites()).toEqual([{ name: "charmander", id: 4 }])
    })
})
