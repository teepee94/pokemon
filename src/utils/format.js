// Display helpers for PokeAPI data.

export const MAX_COMPARE = 4

// "mr-mime" -> "Mr Mime"
export const formatName = (name = "") =>
    name
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")

// 25 -> "#0025"
export const formatId = (id) => `#${String(id).padStart(4, "0")}`

// PokeAPI height is in decimetres, weight in hectograms.
export const formatHeight = (decimetres) => `${(decimetres / 10).toFixed(1)} m`
export const formatWeight = (hectograms) => `${(hectograms / 10).toFixed(1)} kg`

// "generation-iii" -> "Generation III"
export const formatGeneration = (name = "") => {
    const [, numeral = ""] = name.split("-")
    return `Generation ${numeral.toUpperCase()}`
}

export const STAT_LABELS = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
}

// The highest possible base stat (Blissey's HP), used to scale stat bars.
export const MAX_BASE_STAT = 255

// Latest English entry, with the hard line breaks PokeAPI includes removed.
export const getEnglishFlavourText = (species) => {
    const entries = species?.flavor_text_entries?.filter((entry) => entry.language.name === "en") ?? []
    return (
        entries[entries.length - 1]?.flavor_text
            .replace(/[\f\n\r\u00ad]+/g, " ")
            .replace(/\s+/g, " ")
            .trim() ?? ""
    )
}

export const getEnglishGenus = (species) =>
    species?.genera?.find((genus) => genus.language.name === "en")?.genus ?? ""

export const MOVE_METHODS = [
    { key: "level-up", label: "Level up" },
    { key: "machine", label: "TM / HM" },
    { key: "egg", label: "Egg" },
    { key: "tutor", label: "Tutor" },
]

// Main-series games, newest first. PokeAPI doesn't return version groups in
// release order and includes spin-offs, so movesets are read from the newest
// game on this list that the pokemon appears in.
const VERSION_GROUPS = [
    ["scarlet-violet", "Scarlet / Violet"],
    ["sword-shield", "Sword / Shield"],
    ["brilliant-diamond-shining-pearl", "Brilliant Diamond / Shining Pearl"],
    ["lets-go-pikachu-lets-go-eevee", "Let's Go Pikachu / Eevee"],
    ["ultra-sun-ultra-moon", "Ultra Sun / Ultra Moon"],
    ["sun-moon", "Sun / Moon"],
    ["omega-ruby-alpha-sapphire", "Omega Ruby / Alpha Sapphire"],
    ["x-y", "X / Y"],
    ["black-2-white-2", "Black 2 / White 2"],
    ["black-white", "Black / White"],
    ["heartgold-soulsilver", "HeartGold / SoulSilver"],
    ["platinum", "Platinum"],
    ["diamond-pearl", "Diamond / Pearl"],
    ["emerald", "Emerald"],
    ["firered-leafgreen", "FireRed / LeafGreen"],
    ["ruby-sapphire", "Ruby / Sapphire"],
    ["crystal", "Crystal"],
    ["gold-silver", "Gold / Silver"],
    ["yellow", "Yellow"],
    ["red-blue", "Red / Blue"],
]

// Groups a pokemon's moves by how they're learned in its most recent
// main-series game. Returns that game's label alongside the groups.
export const groupMoves = (moves = []) => {
    const groups = Object.fromEntries(MOVE_METHODS.map(({ key }) => [key, []]))
    const present = new Set(
        moves.flatMap((move) => move.version_group_details.map((detail) => detail.version_group.name)),
    )
    const [versionGroup, versionLabel] = VERSION_GROUPS.find(([key]) => present.has(key)) ?? []

    if (!versionGroup) return { versionLabel: null, groups, total: 0 }

    moves.forEach(({ move, version_group_details: details }) => {
        details
            .filter((detail) => detail.version_group.name === versionGroup)
            .forEach((detail) => {
                const method = detail.move_learn_method.name
                // A move can be learned several ways; list it once per method.
                if (groups[method] && !groups[method].some((existing) => existing.name === move.name)) {
                    groups[method].push({ name: move.name, level: detail.level_learned_at })
                }
            })
    })

    groups["level-up"].sort((a, b) => a.level - b.level || a.name.localeCompare(b.name))
    MOVE_METHODS.slice(1).forEach(({ key }) => groups[key].sort((a, b) => a.name.localeCompare(b.name)))

    const total = new Set(
        Object.values(groups)
            .flat()
            .map((move) => move.name),
    ).size

    return { versionLabel, groups, total }
}

const SPRITES = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"

export const getArtworkUrl = (id) => `${SPRITES}/other/official-artwork/${id}.png`
export const getSpriteUrl = (id) => `${SPRITES}/${id}.png`
