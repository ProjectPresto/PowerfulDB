import { createSlice } from '@reduxjs/toolkit';

export type AuthSliceState = { isLogIn: boolean, user: object | null }

const slice = createSlice({
	name: 'auth',
	initialState: {
		isLogIn: false,
		user: null
	} as AuthSliceState,
	reducers: {
		userLoggedIn: (auth) => {
			auth.isLogIn = true;
		}
	}
});

export default slice.reducer;