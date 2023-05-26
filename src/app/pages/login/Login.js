import { React, Component, useState } from 'react';
import './login.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from '@mui/material/TextField';

import { loginUser } from '../../../redux/actions/authActions';

import Icon from './logo dark.svg';

import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CInputGroup, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import './login.css';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',

			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated && nextProps.auth.user.role === 'superAdmin') {
			this.props.history.push('/super-admin/dashboard');
		} else if (nextProps.auth.isAuthenticated && nextProps.auth.user.role === 'admin') {
			this.props.history.push('/admin/dashboard');
		} else if (nextProps.auth.isAuthenticated && nextProps.auth.user.role === 'user') {
			this.props.history.push('/user/dashboard');
		}
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.loginUser({
			email: this.state.email,
			password: this.state.password
		});
	}

	render() {
		const { errors } = this.state;
		/*    let params = queryString.parse(this.props.location.search);
    const { token } = params;
    if (!token) return <div>Error no token!!!!!</div>; */
		return (
			<div className="bg-white min-vh-100 d-flex flex-row align-items-center">
				<CContainer>
					<CRow className="justify-content-center">
						<CCol md={4}>
							<CCardGroup>
								<CCard className="p-4">
									<div className="clearfix">
										<center>
											<img src={Icon} width={185} />{' '}
										</center>
									</div>
									&ensp; &ensp;
									<CCardBody>
										<form autoComplete="off" onSubmit={this.onSubmit}>
											<TextField
												variant="standard"
												required
												fullWidth
												type="email"
												size="small"
												id="fullWidth"
												label="Adress-mail"
												className="Cform_Input"
												error={errors?.email}
												helperText={errors?.email}
												name="email"
												value={this.state.email}
												onChange={this.onChange}
											/>
											&ensp;
											<CInputGroup className="mb-4">
												<TextField
													variant="standard"
													fullWidth
													size="small"
													id="fullWidth"
													label="Password"
													className="Cform_Input"
													type="password"
													error={errors?.password}
													helperText={errors?.password}
													name="password"
													value={this.state.password}
													onChange={this.onChange}
												/>
											</CInputGroup>
											<CRow>
												<CCol xs={7} style={{ width: '100%' }}>
													<div className="d-grid gap-2">
														<CButton
															type="submit"
															className="submmit_btn"
															shape="rounded-pill"
															color="white"
															style={{ backgroundColor: '#0c8bfd' }}
														>
															<strong>Login</strong>
														</CButton>
													</div>
												</CCol>
											</CRow>
											<CRow>
												<CCol xs={6} style={{ paddingLeft: ' 60%' }}>
													&ensp;
													<CButton
														style={{ color: '#0c8bfd', width: '138px' }}
														color="link"
														className="px-0"
														href={'/forgetPassword'}
													>
														Forgot password?
													</CButton>
												</CCol>
											</CRow>
										</form>
									</CCardBody>
								</CCard>
							</CCardGroup>
						</CCol>
					</CRow>
				</CContainer>
			</div>
		);
	}
}
Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
