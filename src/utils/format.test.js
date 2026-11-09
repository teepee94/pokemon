import { describe, expect, it } from "vitest"
import {
    formatGeneration,
    formatHeight,
    formatId,
    formatName,
    formatWeight,
    getEnglishFlavourText,
    groupMoves,
} from "./format"

const move = (name, ...details) => ({
    move: { name },
    version_group_details: details.map(([versionGroup, method, level = 0]) => ({
        version_group: { name: versionGroup },
        move_learn_method: { name: method },
        level_learned_at: level,
    })),
})

describe("formatters", () => {
    it("title-cases hyphenated names", () => {
        expect(formatName("mr-mime")).toBe("Mr Mime")
        expect(formatName("pikachu")).toBe("Pikachu")
    })

    it("pads Pokédex numbers to four digits", () => {
        expect(formatId(25)).toBe("#0025")
        expect(formatId(1025)).toBe("#1025")
    })

    it("converts PokeAPI units to metres and kilograms", () => {
        expect(formatHeight(17)).toBe("1.7 m")
        expect(formatWeight(905)).toBe("90.5 kg")
    })

    it("formats generation names with roman numerals", () => {
        expect(formatGeneration("generation-iii")).toBe("Generation III")
    })

    it("uses the latest English flavour text without PokeAPI's hard line breaks", () => {
        const species = {
            flavor_text_entries: [
                { language: { name: "en" }, flavor_text: "Old\ntext" },
                { language: { name: "ja" }, flavor_text: "日本語" },
                { language: { name: "en" }, flavor_text: "A strange\fseed was\nplanted." },
            ],
        }
        expect(getEnglishFlavourText(species)).toBe("A strange seed was planted.")
    })
})

describe("groupMoves", () => {
    it("reads moves from the newest main-series game, ignoring spin-offs and older games", () => {
        const { versionLabel, groups, total } = groupMoves([
            move("tackle", ["red-blue", "level-up", 1], ["scarlet-violet", "level-up", 1]),
            move("ember", ["scarlet-violet", "level-up", 9]),
            move("razor-wind", ["gold-silver", "egg"]),
            move("spin-off-only", ["champions", "train"]),
        ])

        expect(versionLabel).toBe("Scarlet / Violet")
        expect(groups["level-up"].map((entry) => entry.name)).toEqual(["tackle", "ember"])
        expect(groups.egg).toEqual([])
        expect(total).toBe(2)
    })

    it("falls back to an older game when the pokemon isn't in newer ones", () => {
        const { versionLabel } = groupMoves([move("tackle", ["red-blue", "level-up", 1])])
        expect(versionLabel).toBe("Red / Blue")
    })

    it("sorts level-up moves by level, then name, and lists a move once per method", () => {
        const { groups, total } = groupMoves([
            move("growl", ["scarlet-violet", "level-up", 1]),
            move("ember", ["scarlet-violet", "level-up", 4], ["scarlet-violet", "machine"]),
            move("scratch", ["scarlet-violet", "level-up", 1]),
        ])

        expect(groups["level-up"].map((entry) => `${entry.level}:${entry.name}`)).toEqual([
            "1:growl",
            "1:scratch",
            "4:ember",
        ])
        expect(groups.machine.map((entry) => entry.name)).toEqual(["ember"])
        expect(total).toBe(3)
    })
})
