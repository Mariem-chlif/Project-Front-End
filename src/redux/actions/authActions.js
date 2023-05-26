import axios from '../../helpers/axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, GET_PARAMS, SET_CURRENT_USER } from './types';
import { getUsers, getAdmins } from './usersActions';

//add user light and send url
export const addAdmin = (userData, closeCurrentModal) => dispatch => {
	axios
		.post('/api/auth/createAdmin', userData)
		.then(res => {
			dispatch(getAdmins({ archived: 'false' }));
			closeCurrentModal(false);
			dispatch({
				type: 'SNACKBAR_SHOW',
				payload: { message: 'Email has been sent...', stackType: 'info' }
			});
			return;
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
export const AddUser = (userData, closeCurrentModal) => dispatch => {
	axios
		.post('/api/auth/createUser', userData)
		.then(() => {
			dispatch(getUsers(null, { archived: 'false' }));
			closeCurrentModal(false);
			dispatch({
				type: 'SNACKBAR_SHOW',
				payload: { message: 'Email has been sent...', stackType: 'info' }
			});
			return;
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const registeruser = (token, userData, history) => dispatch => {
	axios
		.post(`/api/auth/registre?Link=` + token, userData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
		.then(res => {
			dispatch({
				type: 'SNACKBAR_SHOW',
				payload: {
					message: 'Your Account has been created...',
					stackType: 'success'
				}
			});
			history.push('/login');

			return;
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
//Forget password
export const forgetPassword = userData => dispatch => {
	axios
		.put('/api/auth/forget-password', userData)
		.then(res => {
			dispatch({
				type: 'SNACKBAR_SHOW',
				payload: { message: 'Email has been sent...', stackType: 'info' }
			});
			return;
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
//Forget password
export const resetPassword = (token, userData, history) => dispatch => {
	axios
		.put(`/api/auth/resetPassword?Link=` + token, userData)
		.then(res => {
			dispatch({
				type: 'SNACKBAR_SHOW',
				payload: {
					message: 'Your password has been changed...',
					stackType: 'info'
				}
			});
			history.push('/login');

			return;
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
export const getParams = (token, userData) => dispatch => {
	axios
		.post('/api/auth/getParams', {
			...userData,
			Link: token
		})

		.then(data =>
			dispatch({
				type: 'GET_LIGHT_USER',
				payload: data.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: null
			})
		);
};

// login
export const loginUser = userData => dispatch => {
	axios
		.post('/api/auth/login', userData)
		.then(res => {
			// save to localStorage
			const { token } = res.data;
			// set token to is
			localStorage.setItem('jwtToken', token);
			// set token to Auth header
			setAuthToken(token);
			// decode  token to get user data
			const decoded = jwt_decode(token);
			// set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
// set logged in user
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};
// Log user out
export const logoutUser = () => dispatch => {
	// Remove token from localStorage
	localStorage.removeItem('jwtToken');
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};
