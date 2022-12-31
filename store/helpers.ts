import { createSlice } from '@reduxjs/toolkit';

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

export const { loginModalOpened, loginModalClosed } = slice.actions;
export default slice.reducer;