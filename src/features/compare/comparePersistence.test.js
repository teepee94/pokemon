import { describe, expect, it } from "vitest"
import { loadCompare, saveCompare, STORAGE_KEY } from "./comparePersistence"

const storageWith = (value) => ({ getItem: () => value, setItem: () => {} })

describe("comparePersistence", () => {
    it("round-trips a saved selection", () => {
        const items = [
            { name: "bulbasaur", id: 1 },
            { name: "mr-mime", id: 122 },
        ]
        saveCompare(items)
        expect(localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify(items))
        expect(loadCompare()).toEqual(items)
    })

    it("drops tampered, duplicate and excess entries", () => {
        const stored = JSON.stringify([
            { name: "bulbasaur", id: 1 },
            { name: "bulbasaur", id: 1 },
            { name: "<script>", id: 2 },
            { name: "../../etc", id: 3 },
            { name: "pikachu", id: -25 },
            { name: "ivysaur", id: "2" },
            null,
            { name: "venusaur", id: 3, extra: "ignored" },
            { name: "charmander", id: 4 },
            { name: "charmeleon", id: 5 },
            { name: "charizard", id: 6 },
        ])

        expect(loadCompare(storageWith(stored))).toEqual([
            { name: "bulbasaur", id: 1 },
            { name: "venusaur", id: 3 },
            { name: "charmander", id: 4 },
            { name: "charmeleon", id: 5 },
        ])
    })

    it("returns an empty selection for invalid or unavailable storage", () => {
        expect(loadCompare(storageWith("not json"))).toEqual([])
        expect(loadCompare(storageWith('{"name":"bulbasaur"}'))).toEqual([])
        expect(
            loadCompare({
                getItem: () => {
                    throw new Error("SecurityError")
                },
            }),
        ).toEqual([])
    })
})
