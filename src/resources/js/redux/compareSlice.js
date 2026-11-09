import { createSlice } from '@reduxjs/toolkit'

export const compareSlice = createSlice({
	name: 'compare',
	initialState: {
		compareItems: [],
	},
	reducers: {
		addToCompare: (state, action) => {
			if (!state.compareItems.includes(action.payload)) {
				state.compareItems.push(action.payload)
			}
		},
		removeFromCompare: (state, action) => {
			state.compareItems = state.compareItems.filter(name => name !== action.payload)
		},
	},
})

export const { addToCompare, removeFromCompare } = compareSlice.actions

export const selectCompare = (state) => state.compare.compareItems

export default compareSlice.reducer
