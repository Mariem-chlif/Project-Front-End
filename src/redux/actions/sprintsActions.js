import axios from '../../helpers/axios';
import { mapBodyToQueries } from 'src/helpers';
import { GET_ERRORS, GET_SPRINT } from './types';

//add Project light and send url
export const addSprint = (sprintData, closeCurrentModal) => dispatch => {
	axios
		.post('/api/sprints/createSprint', sprintData)
		.then(res => {
			closeCurrentModal(false);
			dispatch(getSprint({ archived: 'false' }));
			dispatch({
				type: 'SNACKBAR_SHOW',
				payload: { message: 'Successfully added...', stackType: 'success' }
			});
			return;
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err?.response?.data
			})
		);
};
//get all sprints
export const getSprint = (user, queries) => dispatch => {
	console.log(queries);
	let query;
	if (user?.departement) query = { stack: user.departement };

	axios
		.get('/api/sprints/sprintList' + mapBodyToQueries({ ...query, ...queries }))
		.then(res =>
			dispatch({
				type: GET_SPRINT,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_SPRINT,
				payload: null
			})
		);
};

export const archivedSprint = (sprintId, sprintData, closeModal) => dispatch => {
	dispatch({
		type: GET_ERRORS,
		payload: {}
	});
	axios
		.put('/api/sprints/delete/' + sprintId, sprintData)
		.then(res => {
			dispatch(getSprint(null, { archived: 'false' }));

			dispatch({
				type: 'SNACKBAR_SHOW',
				payload: {
					message: 'Successfully archived...',
					stackType: 'success'
				}
			});
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
export const updateSprint = (sprintId, sprintData, closeModal) => dispatch => {
	console.log(sprintId);
	dispatch({
		type: GET_ERRORS,
		payload: {}
	});
	axios
		.put('/api/sprints/update/' + sprintId, sprintData)
		.then(res => {
			dispatch(getSprint(null, { archived: 'false' }));

			closeModal();
			dispatch({
				type: 'SNACKBAR_SHOW',
				payload: { message: 'Successfully updated...', stackType: 'success' }
			});
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const deleteSprint = (projectid, closeModal) => dispatch => {
	axios.delete('/api/sprints/remove/' + projectid).then(res => {
		dispatch(getSprint(null, { archived: 'true' }));

		closeModal();
		dispatch({
			type: 'SNACKBAR_SHOW',
			payload: { message: 'Successfully deleted ...', stackType: 'success' }
		});
	});
};
