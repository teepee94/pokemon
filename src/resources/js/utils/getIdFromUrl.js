// PokeAPI resource URLs end in the resource id, e.g.
// "https://pokeapi.co/api/v2/generation/3/" -> "3"
export const getIdFromUrl = (url = "") => url.split("/").filter(Boolean).pop()
