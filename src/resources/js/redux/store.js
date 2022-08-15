import { configureStore } from '@reduxjs/toolkit'
import compareSlice from './compareSlice'
import userSlice from "./userSlice"

export const store = configureStore({
	reducer: {
		compare: compareSlice,
		user: userSlice
	},
})