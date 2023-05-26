import axios from '../../helpers/axios';

export const getAllStats = () => async dispatch => {
	try {
		const { data } = await axios.get('/api/statistic');
		dispatch({ type: 'GET_ALL_STATS', payload: data?.data });
	} catch (error) {
		console.log(error?.response?.data);
	}
};
