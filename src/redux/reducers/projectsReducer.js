import { GET_PROJECT, GET_PROJECT_WEB, GET_PROJECT_MOBILE } from '../actions/types';

const initialState = {
	allProjects: null,
	allProjectsWeb: null,
	allProjectsMobile: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_PROJECT:
			return {
				...state,
				allProjects: [...(action.payload && [...action.payload])].reverse()
			};
		case GET_PROJECT_WEB:
			return {
				...state,

				allProjectsWeb: action.payload
			};
		case GET_PROJECT_MOBILE:
			return {
				...state,

				allProjectsMobile: action.payload
			};
		default:
			return state;
	}
}
