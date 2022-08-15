import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		uid: null,
		displayName: null
	},
	reducers: {
		login: (state, action) => { 
			state.uid = action.payload.uid
			state.displayName = action.payload.displayName
		},
		logout: (state) => {
			state.uid = null
			state.displayName = null
		},
	},
})

export const { login, logout } = userSlice.actions

export const selectUser = (state) => state.user

export default userSlice.reducer