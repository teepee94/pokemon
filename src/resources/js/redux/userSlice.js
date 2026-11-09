import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		uid: null,
		displayName: null,
		// "loading" until Firebase reports the initial auth state, so the UI
		// doesn't flash a logged-out view for users who are signed in.
		status: 'loading',
	},
	reducers: {
		login: (state, action) => {
			state.uid = action.payload.uid
			state.displayName = action.payload.displayName
			state.status = 'authenticated'
		},
		logout: (state) => {
			state.uid = null
			state.displayName = null
			state.status = 'unauthenticated'
		},
	},
})

export const { login, logout } = userSlice.actions

export const selectUser = (state) => state.user

export default userSlice.reducer
