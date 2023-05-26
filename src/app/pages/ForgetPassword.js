import { React, Component, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { forgetPassword } from 'src/redux/actions/authActions';
import TextField from '@mui/material/TextField';

import Icon from '../pages/login/logo dark.svg';

import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CInputGroup, CRow } from '@coreui/react';

import '../pages/login/login.css';

class ForgetPassword extends Component {
	constructor() {
		super();
		this.state = {
			email: '',

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
		this.props.forgetPassword({
			email: this.state.email
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
										<form autoComplete="off" onSubmit={this.onsubmit}>
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
															<strong>Forget Password</strong>
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
ForgetPassword.propTypes = {
	forgetPassword: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { forgetPassword })(ForgetPassword);
