import { SET_CURRENT_USER } from '../actions/types';

import isEmpty from '../../validation/is-empty';

const initialState = {
	isAuthenticated: false,
	user: {},
	lightUser: null,
	selectedUserById: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'GET_USER_PROFILE':
			return {
				...state,
				selectedUserById: action.payload
			};

		case 'GET_LIGHT_USER':
			return {
				...state,
				lightUser: action.payload
			};
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		default:
			return state;
	}
}
