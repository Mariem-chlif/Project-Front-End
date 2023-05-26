import { React, Component, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetPassword } from 'src/redux/actions/authActions';
import TextField from '@mui/material/TextField';

import Icon from '../pages/login/logo dark.svg';

import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CInputGroup, CRow } from '@coreui/react';

import '../pages/login/login.css';
function getParameterByName(name) {
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

class ResetPassword extends Component {
	constructor() {
		super();
		this.state = {
			newPassword: '',
			token: getParameterByName('token'),
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onsubmit = this.onsubmit.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onsubmit(e) {
		e.preventDefault();
		const password = { newPassword: this.state.newPassword };

		this.props.resetPassword(this.state.token, password, this.props.history);
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
										<form autoComplete="off" onSubmit={this.onsubmit}>
											<TextField
												required
												variant="standard"
												fullWidth
												size="small"
												id="fullWidth"
												label=" New Password"
												className="Cform_Input"
												type="password"
												error={errors?.password}
												helperText={errors?.password}
												name="Password"
												value={this.state.password}
												onChange={this.onChange}
											/>
											&ensp;
											<CInputGroup className="mb-4">
												<TextField
													variant="standard"
													required
													fullWidth
													type="password"
													size="small"
													id="fullWidth"
													label=" confirm Password"
													className="Cform_Input"
													error={errors?.newPassword}
													helperText={errors?.newPassword}
													name="newPassword"
													value={this.state.newPassword}
													onChange={this.onChange}
												/>
											</CInputGroup>
											&ensp;
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
															<strong>Reset Password</strong>
														</CButton>
													</div>
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
ResetPassword.propTypes = {
	resetPassword: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
