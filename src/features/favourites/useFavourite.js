import { useSelector } from "react-redux"
import { skipToken } from "@reduxjs/toolkit/query"
import { isPopupClosed, signInWithGoogle } from "../../lib/firebase"
import { selectUser } from "../auth/userSlice"
import { useAddFavouriteMutation, useGetFavouritesQuery, useRemoveFavouriteMutation } from "./favouritesApi"

// Favourite state for one pokemon, read from the shared favourites list.
// Mutations carry the uid and name they were started with, so navigating to
// another pokemon mid-save can never apply the result to the wrong one.
export function useFavourite(pokemon) {
    const { uid } = useSelector(selectUser)
    const { data: favourites = [], isLoading } = useGetFavouritesQuery(uid ?? skipToken)
    const [addFavourite, addState] = useAddFavouriteMutation()
    const [removeFavourite, removeState] = useRemoveFavouriteMutation()

    const isSaved = favourites.some((favourite) => favourite.name === pokemon.name)
    const isSaving = addState.isLoading || removeState.isLoading
    const isError = addState.isError || removeState.isError

    const toggle = async () => {
        if (!uid) {
            try {
                await signInWithGoogle()
            } catch (error) {
                if (!isPopupClosed(error)) console.error(error)
            }
            return
        }

        const args = { uid, name: pokemon.name, id: pokemon.id }
        // unwrap() surfaces failures; the optimistic update has already been
        // rolled back by then, so there's nothing else to undo here.
        try {
            await (isSaved ? removeFavourite(args) : addFavourite(args)).unwrap()
        } catch (error) {
            console.error(error)
        }
    }

    return { isSignedIn: Boolean(uid), isSaved, isSaving, isChecking: isLoading, isError, toggle }
}
