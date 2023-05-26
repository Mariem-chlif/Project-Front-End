import { mapBodyToQueries } from 'src/helpers';
import axios from '../../helpers/axios';
import { GET_ADMINS, GET_USERS, GET_ERRORS } from './types';
//get all admins
export const getAdmins = query => dispatch => {
	axios
		.get('/api/users/adminsList' + mapBodyToQueries(query))
		.then(res =>
			dispatch({
				type: GET_ADMINS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ADMINS,
				payload: null
			})
		);
};

//get all users
export const getUsers = (user, queries) => dispatch => {
	let query;
	if (user?.departement) query = { stack: user.departement };

	axios
		.get('/api/users/usersList' + mapBodyToQueries({ ...query, ...queries }))
		.then(res =>
			dispatch({
				type: GET_USERS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_USERS,
				payload: null
			})
		);
};

//get all users
export const getUsersActive = (user, queries) => dispatch => {
	let query;
	if (user?.departement) query = '?stack=' + user.departement;

	axios
		.get('/api/users/usersListActive' + mapBodyToQueries({ ...query, ...queries }))
		.then(res =>
			dispatch({
				type: GET_USERS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_USERS,
				payload: null
			})
		);
};

//update User (archived will be true)
export const archivedAdmin = (userid, userData, state) => dispatch => {
	axios
		.put('/api/users/delete/' + userid, userData)
		.then(res => {
			dispatch(getAdmins({ archived: state || 'false' }));

			dispatch({
				type: 'SNACKBAR_SHOW',
				payload: { message: 'Successfully archived...', stackType: 'success' }
			});
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

//update User (archived will be true)
export const updateAdmin = (userid, userData, closeModal) => dispatch => {
	axios
		.put('/api/users/updateAdmin/' + userid, userData)
		.then(res => {
			dispatch(getAdmins({ archived: 'false' }));
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
//update User (archived will be true)
export const updateUser = (userid, userData, closeModal) => dispatch => {
	axios
		.put('/api/users/update/' + userid, userData)
		.then(res => {
			dispatch(getUsers(null, { archived: 'false' }));

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

//update User (archived will be true)
export const archivedUser = (userid, userData, closeModal, state) => dispatch => {
	axios.put('/api/users/delete/' + userid, userData).then(res => {
		dispatch(getUsers(null, { archived: state || 'false' }));

		dispatch({
			type: 'SNACKBAR_SHOW',
			payload: { message: 'Successfully archived...', stackType: 'success' }
		});
	});
};
//update Profile
export const updateProfile = (userid, userData, closeCurrentModal) => dispatch => {
	console.clear(userid);

	axios
		.put('/api/users/update/' + userid, userData)
		.then(() => {
			dispatch(getParamsUser(userid));
			closeCurrentModal(false);
			return;
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err?.response?.data
			})
		);
};

export const getParamsUser = (userid, userData, history) => dispatch => {
	axios
		.get('/api/users/getParams/' + userid)
		.then(res => res.data.user)
		.then(payload =>
			dispatch({
				type: 'GET_USER_PROFILE',
				payload
			})
		);
};

export const deleteUser = (userid, closeModal) => dispatch => {
	axios.delete('/api/users/remove/' + userid).then(res => {
		dispatch(getUsers(null, { archived: 'true' }));

		closeModal();
		dispatch({
			type: 'SNACKBAR_SHOW',
			payload: { message: 'Successfully deleted ...', stackType: 'success' }
		});
	});
};

export const deleteAdmin = (userid, closeModal) => dispatch => {
	axios.delete('/api/users/remove/' + userid).then(res => {
		dispatch(getAdmins({ archived: 'true' }));

		closeModal();
		dispatch({
			type: 'SNACKBAR_SHOW',
			payload: { message: 'Successfully deleted ...', stackType: 'success' }
		});
	});
};
