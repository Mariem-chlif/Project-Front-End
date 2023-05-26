import { React, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addAdmin } from '../../../redux/actions/authActions';
import { withRouter } from 'react-router-dom';
import '../../components/file.css';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';
import './addAdmin.css';

import { CButton, CModalFooter, CModalBody, CForm } from '@coreui/react';
import { TextField } from '@mui/material';
class AddAdmin extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			departement: '',
			role: 'admin',
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		const user = {
			email: this.state.email,
			departement: this.state.departement,
			role: this.state.role
		};
		this.props.addAdmin(user, this.props.closeCurrentModal);
	}

	render() {
		const { errors } = this.state;
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
						value={this.state.email}
						onChange={this.onChange}
						variant="standard"
					/>
					&ensp;
					<TextField
						className="MuiInputBase-input"
						fullWidth
						id="standard-select-currency"
						select
						label="Departement"
						error={errors?.departement}
						helperText={errors?.departement}
						variant="standard"
						name="departement"
						value={this.state.departement}
						onChange={this.onChange}
					>
						{departement.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
								&ensp;
							</MenuItem>
						))}
					</TextField>
					&ensp;
				</CModalBody>
				<CModalFooter className="btn_actions_calendar modal_action">
					<CButton type="submit" color="light" variant="outline" size="lg" shape="rounded-15">
						<SendIcon />
						Send Email
					</CButton>
				</CModalFooter>
			</CForm>
		);
	}
}
AddAdmin.propTypes = {
	addAdmin: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, { addAdmin })(withRouter(AddAdmin));
