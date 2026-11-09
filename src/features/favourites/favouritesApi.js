import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import { loadFirestore } from "../../lib/firestore"

// Favourites live in Firestore at pokemon/{uid}/favourites/{name} = { id }.
// Wrapping them in RTK Query gives one cached list per user that every page
// shares, with optimistic add/remove that rolls back if the write fails.
const favouritesRef = ({ collection, db }, uid) => collection(db, "pokemon", uid, "favourites")

const toError = (error) => ({ error: { status: "FIRESTORE_ERROR", message: error.message } })

// Applies a change to the cached list immediately, then undoes it if the
// Firestore write is rejected.
const optimistic =
    (update) =>
    async (args, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
            favouritesApi.util.updateQueryData("getFavourites", args.uid, (draft) => update(draft, args)),
        )
        try {
            await queryFulfilled
        } catch {
            patch.undo()
        }
    }

export const favouritesApi = createApi({
    reducerPath: "favouritesApi",
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Favourites"],
    endpoints: (build) => ({
        getFavourites: build.query({
            async queryFn(uid) {
                try {
                    const firestore = await loadFirestore()
                    const snapshot = await firestore.getDocs(favouritesRef(firestore, uid))
                    const favourites = snapshot.docs
                        .map((favourite) => ({ name: favourite.id, id: favourite.data().id }))
                        .sort((a, b) => a.id - b.id)
                    return { data: favourites }
                } catch (error) {
                    return toError(error)
                }
            },
            providesTags: (result, error, uid) => [{ type: "Favourites", id: uid }],
        }),

        addFavourite: build.mutation({
            async queryFn({ uid, name, id }) {
                try {
                    const firestore = await loadFirestore()
                    await firestore.setDoc(firestore.doc(favouritesRef(firestore, uid), name), { id })
                    return { data: null }
                } catch (error) {
                    return toError(error)
                }
            },
            onQueryStarted: optimistic((draft, { name, id }) => {
                if (!draft.some((favourite) => favourite.name === name)) {
                    draft.push({ name, id })
                    draft.sort((a, b) => a.id - b.id)
                }
            }),
        }),

        removeFavourite: build.mutation({
            async queryFn({ uid, name }) {
                try {
                    const firestore = await loadFirestore()
                    await firestore.deleteDoc(firestore.doc(favouritesRef(firestore, uid), name))
                    return { data: null }
                } catch (error) {
                    return toError(error)
                }
            },
            onQueryStarted: optimistic((draft, { name }) => {
                const index = draft.findIndex((favourite) => favourite.name === name)
                if (index !== -1) draft.splice(index, 1)
            }),
        }),
    }),
})

export const { useGetFavouritesQuery, useAddFavouriteMutation, useRemoveFavouriteMutation } = favouritesApi
