const initialState = {
	allStats: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'GET_ALL_STATS':
			return {
				...state,
				allStats: action.payload
			};
		default:
			return state;
	}
}
