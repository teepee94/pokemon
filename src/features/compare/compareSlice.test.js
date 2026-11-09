import { describe, expect, it } from "vitest"
import reducer, { addToCompare, clearCompare, removeFromCompare } from "./compareSlice"

const apply = (...actions) => actions.reduce(reducer, undefined).compareItems

describe("compareSlice", () => {
    it("adds pokemon once, in the order they were picked", () => {
        expect(
            apply(
                addToCompare({ name: "bulbasaur", id: 1 }),
                addToCompare({ name: "charmander", id: 4 }),
                addToCompare({ name: "bulbasaur", id: 1 }),
            ),
        ).toEqual([
            { name: "bulbasaur", id: 1 },
            { name: "charmander", id: 4 },
        ])
    })

    it("caps the selection at four", () => {
        const items = apply(...[1, 2, 3, 4, 5].map((id) => addToCompare({ name: `pokemon-${id}`, id })))
        expect(items.map((item) => item.id)).toEqual([1, 2, 3, 4])
    })

    it("removes by name and clears", () => {
        const added = [addToCompare({ name: "bulbasaur", id: 1 }), addToCompare({ name: "squirtle", id: 7 })]
        expect(apply(...added, removeFromCompare("bulbasaur"))).toEqual([{ name: "squirtle", id: 7 }])
        expect(apply(...added, clearCompare())).toEqual([])
    })
})
