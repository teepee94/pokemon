import { createSlice } from '@reduxjs/toolkit'

export const compareSlice = createSlice({
	name: 'compare',
	initialState: {
		compareItems: [],
	},
	reducers: {
		increment: (state, action) => {
			state.compareItems = [...state.compareItems, action.payload]
		},
	},
})

export const { increment } = compareSlice.actions

export const selectCompare = (state) => state.compare.compareItems

export default compareSlice.reducer