import React, { Component, Suspense } from 'react';
import { BrowserRouter as Routes } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';
import PrivateRoute from './app/components/common/PrivateRoute';
import { Provider } from 'react-redux';
import './scss/style.scss';
import store from './redux/store';
import { Switch, Route } from 'react-router';
import './global.scss';
// check for token
if (localStorage.jwtToken) {
	// set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);
	// set user isAuthenticatedx²
	store.dispatch(setCurrentUser(decoded));
	//check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		//logout user
		store.dispatch(logoutUser());
		//redirect to login
		window.location.href = '/login';
	}
}

const loading = (
	<div className="pt-3 text-center">
		<div className="sk-spinner sk-spinner-pulse"></div>
	</div>
);

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('../src/app/pages/login/Login'));
const Page404 = React.lazy(() => import('./app/components/404'));
const Register = React.lazy(() => import('../src/app/pages/register/Register'));
const forgetPassword = React.lazy(() => import('./app/pages/ForgetPassword'));
const resetPassword = React.lazy(() => import('./app/pages/ResetPassword'));

const SnackNotif = React.lazy(() => import('./app/components/SnackNotif'));

const App = () => {
	return (
		<Provider store={store}>
			<Suspense fallback={loading}>
				<Routes>
					<Switch>
						<Route exact path="/login" name="Login Page" component={Login} />

						<Route exact path="/register" name="Register Page" component={Register} />
						<Route exact path="/forgetPassword" name="forgetPassword Page" component={forgetPassword} />
						<Route exact path="/resetPassword" name="resetPassword Page" component={resetPassword} />

						<Route exact path="/error/404" name="404" component={Page404} />
						<PrivateRoute path="*" name="Home" component={DefaultLayout} />
					</Switch>
				</Routes>

				<SnackNotif />
			</Suspense>
		</Provider>
	);
};

export default App;
