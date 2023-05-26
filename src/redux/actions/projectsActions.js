import axios from '../../helpers/axios';
import { mapBodyToQueries } from 'src/helpers';
import { GET_ERRORS, GET_PROJECT, GET_PROJECT_WEB, GET_PROJECT_MOBILE } from './types';
import SocketProvider from 'src/helpers/socket';

//add Project light and send url
export const addProject = (projectData, closeCurrentModal) => dispatch => {
	axios
		.post('/api/projects/createProject', projectData)
		.then(res => {
			closeCurrentModal(false);
			dispatch(getProject({ archived: 'false' }));
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
//get all Projects
export const getProject = (user, queries) => dispatch => {
	let query;
	if (user?.departement) query = { stack: user.departement };

	axios
		.get('/api/projects/projectList' + mapBodyToQueries({ ...query, ...queries }))
		.then(res =>
			dispatch({
				type: GET_PROJECT,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROJECT,
				payload: null
			})
		);
};

export const getProjectWeb = () => dispatch => {
	axios
		.get('/api/projects/projectListWeb')
		.then(res =>
			dispatch({
				type: GET_PROJECT_WEB,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROJECT_WEB,
				payload: null
			})
		);
};
export const getProjectMobile = () => dispatch => {
	axios
		.get('/api/projects/projectListMobile')
		.then(res =>
			dispatch({
				type: GET_PROJECT_MOBILE,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROJECT_MOBILE,
				payload: null
			})
		);
};
export const archivedProject = (projectid, ProjectData, closeModal) => dispatch => {
	dispatch({
		type: GET_ERRORS,
		payload: {}
	});
	axios
		.put('/api/projects/delete/' + projectid, ProjectData)
		.then(res => {
			dispatch(getProject());

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
export const updateProject = (projectid, ProjectData, closeModal) => dispatch => {
	dispatch({
		type: GET_ERRORS,
		payload: {}
	});
	axios
		.put('/api/projects/update/' + projectid, ProjectData)
		.then(res => {
			dispatch(getProject(null, { archived: 'false' }));

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
export const assignUsersToProject = (projectid, users) => dispatch => {
	axios.put('/api/projects/assignProject/' + projectid, { users }).then(res => alert('assign with success ...'));
	// .catch((err) =>
	//        dispatch({
	//               type: GET_ERRORS,
	//               payload: err.response.data,
	//        })
	// )
};

export const deleteProject = (projectid, closeModal) => dispatch => {
	axios.delete('/api/projects/remove/' + projectid).then(res => {
		dispatch(getProject(null, { archived: 'true' }));

		closeModal();
		dispatch({
			type: 'SNACKBAR_SHOW',
			payload: { message: 'Successfully deleted ...', stackType: 'success' }
		});
	});
};
