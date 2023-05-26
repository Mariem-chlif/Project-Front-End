import { GET_SPRINT } from '../actions/types';

const initialState = {
	allSprints: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_SPRINT:
			return {
				...state,
				allSprints: [...action.payload].reverse()
			};
		default:
			return state;
	}
}
