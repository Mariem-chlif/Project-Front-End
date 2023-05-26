import axios from '../../helpers/axios';

export const getAllNotifications = userId => async dispatch => {
	try {
		const { data } = await axios.get('/api/notifications/get_current/' + userId);
		dispatch({ type: 'GET_ALL_NOTIFICATIONS', payload: [...data?.data].reverse() });
	} catch (error) {
		console.log(error?.response?.data);
	}
};
