import { combineReducers } from 'redux';
import authReducer from './auth';
import helpersReducer from './helpers';

export default combineReducers({
	auth: authReducer,
	helpers: helpersReducer
});
