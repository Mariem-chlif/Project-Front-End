import { React, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registeruser } from '../../../redux/actions/authActions';
import TextField from '@mui/material/TextField';
import { getParams } from '../../../redux/actions/authActions';
import logoMobilite from '../../../../src/assets/images/logo.png';
import Icon from './logo dark.svg';
import './Register.css';

import {
	CButton,
	CCard,
	CCardBody,
	CCol,
	CContainer,
	CForm,
	CFormInput,
	CInputGroup,
	CInputGroupText,
	CRow,
	CImage
} from '@coreui/react';
import './Register.css';
function getParameterByName(name) {
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			phone: '',
			avatar: '',
			password: '',
			password2: '',
			position: null,
			stack: null,
			competence: null,
			token: getParameterByName('token'),
			email: null,
			departement: null,
			errors: {},
			LightUser: null
		};

		this.onChange = this.onChange.bind(this);
		this.fileonChange = this.fileonChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentWillMount() {
		this.props.getParams(this.state.token);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.auth) {
			this.setState({ LightUser: nextProps.auth.lightUser });
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	fileonChange(e) {
		this.setState({ [e.target.name]: e.target.files[0] });
	}
	onSubmit(e) {
		e.preventDefault();
		const FileToUpload = new FormData();
		FileToUpload.append('avatar', this.state.avatar);
		FileToUpload.append('name', this.state.name);
		FileToUpload.append('phone', this.state.phone);
		FileToUpload.append('email', this.state.LightUser?.email);
		FileToUpload.append('password', this.state.password);
		FileToUpload.append('password2', this.state.password2);

		this.props.registeruser(this.state.token, FileToUpload, this.props.history);
	}

	render() {
		const { LightUser } = this.state;
		const { errors } = this.state;
		return (
			<div className="bg-white min-vh-100 d-flex flex-row align-items-center">
				<CContainer>
					<CRow className="justify-content-center">
						<CCol md={5} lg={5} xl={4}>
							<CCard className="mx-4">
								&ensp;
								<div className="clearfix">
									<center>
										<img src={Icon} width={210} />{' '}
									</center>
								</div>
								<CCardBody className="p-3">
									<form onSubmit={this.onSubmit}>
										<CInputGroup className="mb-3">
											<TextField
												variant="standard"
												required
												fullWidth
												type="text"
												size="small"
												id="fullWidth"
												label="Username"
												className="Cform_Input"
												error={errors?.name}
												helperText={errors?.name}
												name="name"
												value={this.state.name}
												onChange={this.onChange}
											/>
										</CInputGroup>
										<CInputGroup className="mb-2">
											<TextField
												variant="standard"
												required
												fullWidth
												type="file"
												size="small"
												id="fullWidth"
												label="Avatar"
												className="Cform_Input"
												error={errors?.avatar}
												helperText={errors?.avatar}
												name="avatar"
												onChange={this.fileonChange}
											/>
										</CInputGroup>

										<CInputGroup className="mb-2">
											<TextField
												disabled
												variant="standard"
												fullWidth
												type="email"
												size="small"
												id="fullWidth"
												label="email"
												className="Cform_Input"
												name="email"
												value={LightUser?.email}
											/>
										</CInputGroup>

										<CInputGroup className="mb-3">
											<TextField
												variant="standard"
												required
												fullWidth
												type="number"
												size="small"
												id="fullWidth"
												label="Phone Number"
												className="Cform_Input"
												error={errors?.phone}
												helperText={errors?.phone}
												name="phone"
												value={this.state.phone}
												onChange={this.onChange}
											/>
										</CInputGroup>
										{LightUser?.role === 'admin' && (
											<CInputGroup className="mb-3">
												<TextField
													disabled
													variant="standard"
													fullWidth
													type="text"
													size="small"
													id="fullWidth"
													label="Departement"
													className="Cform_Input"
													name="departement"
													value={LightUser?.departement}
												/>
											</CInputGroup>
										)}

										{LightUser?.role === 'user' && (
											<CInputGroup className="mb-3">
												<TextField
													disabled
													variant="standard"
													fullWidth
													type="text"
													size="small"
													id="fullWidth"
													label="Position"
													className="Cform_Input"
													name="position"
													value={LightUser?.position}
												/>
											</CInputGroup>
										)}
										{LightUser?.role === 'user' && (
											<CInputGroup className="mb-3">
												<TextField
													disabled
													variant="standard"
													fullWidth
													type="text"
													size="small"
													id="fullWidth"
													label="Stack"
													className="Cform_Input"
													name="stack"
													value={LightUser?.stack}
												/>
											</CInputGroup>
										)}
										{LightUser?.role === 'user' && (
											<CInputGroup className="mb-3">
												<TextField
													disabled
													variant="standard"
													fullWidth
													type="text"
													size="small"
													id="fullWidth"
													label="Competence"
													className="Cform_Input"
													name="competence"
													value={LightUser?.competence}
												/>
											</CInputGroup>
										)}
										<CInputGroup className="mb-3">
											<TextField
												variant="standard"
												required
												fullWidth
												type="password"
												size="small"
												id="fullWidth"
												label="Password"
												className="Cform_Input"
												error={errors?.password}
												helperText={errors?.password}
												name="password"
												value={this.state.password}
												onChange={this.onChange}
											/>
										</CInputGroup>
										<CInputGroup className="mb-4">
											<TextField
												variant="standard"
												required
												fullWidth
												type="password"
												size="small"
												id="fullWidth"
												label="Repeat password"
												className="Cform_Input"
												error={errors?.password2}
												helperText={errors?.password2}
												name="password2"
												value={this.state.password2}
												onChange={this.onChange}
											/>
										</CInputGroup>
										<div className="d-grid">
											<CButton
												type="submit"
												color="white"
												className="submmit_btn"
												style={{ backgroundColor: '#0c8bfd' }}
											>
												Create Account
											</CButton>
										</div>
									</form>
								</CCardBody>
							</CCard>
						</CCol>
					</CRow>
				</CContainer>
			</div>
		);
	}
}

Register.propTypes = {
	registeruser: PropTypes.func.isRequired,
	getParams: PropTypes.func.isRequired,

	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, {
	registeruser,
	getParams
})(withRouter(Register));
