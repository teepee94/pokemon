import axios from "axios";

const instance = axios.create({
    baseURL: "https://pokeapi.co/api/v2"
})

// Instances created with axios.create() don't carry the static helpers,
// so re-export the one we need for ignoring aborted requests.
export const isCancel = axios.isCancel;

export default instance;
