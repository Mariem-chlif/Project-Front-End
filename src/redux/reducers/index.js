import { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import errorsReducer from './errorsReducer.js';
import usersReducers from './usersReducers.js';
import projectReducers from './projectsReducer';
import sharedReducer from './sharedReducer';
import sprintsReducer from './sprintsReducer.js';
import notificationReducer from './notification.reducers';
import statisticsReducer from './statistics.reducers';

const createReducer = asyncReducers => (state, action) => {
	const combinedReducer = combineReducers({
		auth: authReducer,
		errors: errorsReducer,
		users: usersReducers,
		shared: sharedReducer,
		projects: projectReducers,
		sprints: sprintsReducer,
		statistics: statisticsReducer,
		notifications: notificationReducer
	});

	/*
	Reset the redux store when user logged out
	 */
	if (action.type === 'set') {
		return {
			...state,
			sidebarShow: action.sidebarShow
		};
	}

	return combinedReducer(state, action);
};

export default createReducer;
