import { React, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getParamsUser } from '../../../redux/actions/usersActions';
import { updateAdmin } from '../../../redux/actions/usersActions';
import { withRouter } from 'react-router-dom';
import '../../components/file.css';
import MenuItem from '@mui/material/MenuItem';

import {
	CFormInput,
	CFormLabel,
	CButton,
	CModalFooter,
	CModalBody,
	CForm,
	CFormFeedback,
	CFormSelect
} from '@coreui/react';
import { TextField } from '@mui/material';

class UpdateAdmin extends Component {
	constructor() {
		super();
		this.state = {
			LightUser: null,

			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	componentWillMount(userid) {
		this.props.getParamsUser(userid);
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
	handleClick(userId) {
		this.setState({ errors: {} });
		this.props.updateAdmin(
			userId,
			{
				...this.props.userToUpdate,
				...this.state
			},
			this.props.closeModale
		);
	}

	render() {
		const { errors } = this.state;
		const { LightUser } = this.state;
		const departement = [
			{ label: 'WEB', value: 'WEB' },
			{ label: 'MOBILE', value: 'MOBILE' }
		];

		return (
			<CForm onSubmit={this.onSubmit} className="mb-3">
				<CModalBody>
					<TextField
						fullWidth
						label="Address-mail"
						error={errors?.email}
						helperText={errors?.email}
						type="email"
						name="email"
						defaultValue={this.props.userToUpdate?.email || LightUser?.email}
						onChange={this.onChange}
						variant="standard"
					/>
					&ensp;
					<TextField
						fullWidth
						id="standard-select-currency"
						select
						label="Departement"
						error={errors?.departement}
						helperText={errors?.departement}
						variant="standard"
						name="departement"
						defaultValue={this.props.userToUpdate?.departement || LightUser?.departement}
						onChange={this.onChange}
					>
						{departement.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</CModalBody>
				<CModalFooter className="btn_actions_calendar">
					<CButton
						color="light"
						variant="outline"
						shape="rounded-15"
						onClick={() => this.handleClick(this.props.userToUpdate?._id)}
					>
						UPDATE
					</CButton>
				</CModalFooter>
			</CForm>
		);
	}
}
UpdateAdmin.propTypes = {
	getParamsUser: PropTypes.func.isRequired,
	archivedAdmin: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, { getParamsUser, updateAdmin })(withRouter(UpdateAdmin));
