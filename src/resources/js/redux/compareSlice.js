import { createSlice } from '@reduxjs/toolkit'
import { MAX_COMPARE } from '../utils/format'

// Items are { name, id } so the compare tray can show sprites without
// fetching each pokemon.
export const compareSlice = createSlice({
	name: 'compare',
	initialState: {
		compareItems: [],
	},
	reducers: {
		addToCompare: (state, action) => {
			const isFull = state.compareItems.length >= MAX_COMPARE
			const exists = state.compareItems.some(item => item.name === action.payload.name)

			if (!isFull && !exists) {
				state.compareItems.push(action.payload)
			}
		},
		removeFromCompare: (state, action) => {
			state.compareItems = state.compareItems.filter(item => item.name !== action.payload)
		},
		clearCompare: (state) => {
			state.compareItems = []
		},
	},
})

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions

export const selectCompare = (state) => state.compare.compareItems
export const selectIsCompareFull = (state) => state.compare.compareItems.length >= MAX_COMPARE

export default compareSlice.reducer
