import { Dispatch, SetStateAction } from 'react';
import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

import { AppDispatch, RootState } from '@store/store';
import { SimplifiedContributor } from '@models/user';
import { Tokens } from '@models/generic';
import HttpService from '@services/HttpService';
import UserService from '@services/UserService';
import { toggleLoginModal } from '@store/helpers';

export type AuthSliceState = { isLogIn: boolean, contributor: SimplifiedContributor | null }

const slice = createSlice({
	name: 'auth',
	initialState: {
		isLogIn: false,
		contributor: null
	} as AuthSliceState,
	reducers: {
		contributorLoggedIn: (auth, action) => {
			auth.isLogIn = true;
			auth.contributor = action.payload.contributor;
		},
		contributorLoggedOut: (auth) => {
			auth.isLogIn = false;
			auth.contributor = null;
		}
	}
});

const { contributorLoggedOut, contributorLoggedIn } = slice.actions;

export default slice.reducer;

export const logOutContributor = () => (dispatch: AppDispatch) => {
	toast.success('Logged out 👌');
	HttpService.resetAuthHeader();
	localStorage.removeItem('tokens');
	return dispatch(contributorLoggedOut());
};

export const logInContributor = (username: string, password: string, setError: Dispatch<SetStateAction<string | null>>) => async (dispatch: AppDispatch) => {
	try {
		const data: Tokens = await toast.promise(UserService.getJWT({ username, password }), {
			pending: 'Logging in', success: 'Logged in', error: 'Error when logging in'
		});
		setError(null);
		localStorage.setItem('tokens', JSON.stringify(data));

		dispatch(setContributor());
		dispatch(toggleLoginModal(false));
		return true;
	} catch (err: any) {
		setError(err.response?.data?.detail);
		return false;
	}
};

export const setContributor = () => async (dispatch: AppDispatch) => {
	const tokens = localStorage.getItem('tokens');
	if (tokens === null) {
		return dispatch(contributorLoggedOut());
	}
	const { access: accessToken } = JSON.parse(tokens);
	const { user_id, exp }: { user_id: number, exp: number } = jwtDecode(accessToken);

	// Check if token has expired
	if (exp >= Date.now()) {
		toast.info('Your session has expired. Log in again.');
		localStorage.removeItem('tokens');
		return dispatch(contributorLoggedOut());
	}

	// Set header for future requests
	HttpService.setAuthHeader(accessToken);

	// Get contributor and set it in store
	try {
		const contributor = await UserService.getContributor(user_id, true);
		return dispatch(contributorLoggedIn({ contributor }));
	} catch (err: any) {
		toast.error(err.response?.data?.detail);
		localStorage.removeItem('tokens');
		return dispatch(contributorLoggedOut());
	}
};

export const getContributor = (state: RootState) => state.auth.contributor;