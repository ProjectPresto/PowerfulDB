import { createSlice, Dispatch } from '@reduxjs/toolkit';

export type HelpersSliceState = { isLoginModalOpen: boolean }

const slice = createSlice({
	name: 'helpers',
	initialState: {
		isLoginModalOpen: false
	} as HelpersSliceState,
	reducers: {
		loginModalOpened: (helpers) => {
			helpers.isLoginModalOpen = true;
		},
		loginModalClosed: (helpers) => {
			helpers.isLoginModalOpen = false;
		}
	}
});

export const toggleLoginModal = (showLogin: boolean) => (dispatch: Dispatch) =>
	dispatch(showLogin ? slice.actions.loginModalOpened() : slice.actions.loginModalClosed());

export default slice.reducer;
