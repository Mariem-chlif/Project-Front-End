const initialState = {
	allNotifications: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'GET_ALL_NOTIFICATIONS':
			return {
				...state,
				allNotifications: action.payload
			};
		default:
			return state;
	}
}
