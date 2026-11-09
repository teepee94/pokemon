import { MAX_COMPARE } from "../../utils/format"

const STORAGE_KEY = "pokedex:compare"

// localStorage is user-editable, so anything read back is validated before it
// reaches the store (and from there, URLs and API requests).
const isValidItem = (item) =>
    item !== null &&
    typeof item === "object" &&
    typeof item.name === "string" &&
    /^[a-z0-9-]{1,40}$/.test(item.name) &&
    Number.isInteger(item.id) &&
    item.id > 0

export function loadCompare(storage = globalThis.localStorage) {
    try {
        const parsed = JSON.parse(storage?.getItem(STORAGE_KEY) ?? "[]")
        if (!Array.isArray(parsed)) return []

        const unique = parsed.filter(
            (item, index) =>
                isValidItem(item) && parsed.findIndex((other) => other?.name === item.name) === index,
        )
        return unique.slice(0, MAX_COMPARE).map(({ name, id }) => ({ name, id }))
    } catch {
        return []
    }
}

export function saveCompare(items, storage = globalThis.localStorage) {
    try {
        storage?.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
        // Storage can be full or disabled (e.g. some private modes); the
        // selection just won't survive a reload.
    }
}

export { STORAGE_KEY }
