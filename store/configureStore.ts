import { configureStore as configureMainStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import { AuthSliceState } from './auth';
import { HelpersSliceState } from './helpers';

export type State = {
	auth: AuthSliceState,
	helpers: HelpersSliceState
};

const configureStore = () => {
	return configureMainStore({
		reducer
	});
};

export default configureStore;