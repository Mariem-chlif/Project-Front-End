import { React, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AddUser } from '../../../redux/actions/authActions';
import { withRouter } from 'react-router-dom';
import Input from '@mui/material/Input';
import '../../components/file.css';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';

import { CButton, CModalFooter, CModalBody, CForm } from '@coreui/react';
import { Autocomplete, TextField } from '@mui/material';

const competenceList = ['Reactjs', 'symfony', 'javascript', 'angularjs', 'angular'];
const position = [
	{ label: 'TESTEUR', value: 'TESTEUR' },
	{ label: 'FRONTEND DEVELOPPER', value: 'FRONTEND DEVELOPPER' },
	{ label: 'BACKEND DEVELOPPER', value: 'BACKEND DEVELOPPER' },
	{
		label: 'FULLSTACK DEVELOPPER',
		value: 'FULLSTACK DEVELOPPER'
	},
	{
		label: 'PRODUCT OWNER',
		value: 'PRODUCT OWNER'
	},
	{
		label: 'SCRUM MASTER',
		value: 'SCRUM MASTER'
	},
	{
		label: 'TEACH LEAD',
		value: 'TEACH LEAD'
	}
];
const stack = [
	{ label: 'WEB', value: 'WEB' },
	{ label: 'MOBILE', value: 'MOBILE' }
];

class addUser extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			position: '',
			cout: '',
			role: 'user',
			competence: [],

			stack: '',
			displaySocialInputs: false,

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
	onChangeMultiSelect(e, v) {
		this.setState({ competence: v });
	}
	onSubmit(e) {
		e.preventDefault();
		const user = {
			email: this.state.email,
			cout: this.state.cout,
			role: this.state.role,
			position: this.state.position,
			competence: this.state.competence,
			stack: this.state.stack
		};
		this.props.AddUser(user, this.props.closeCurrentModal);
	}

	render() {
		const { errors } = this.state;

		return (
			<form onSubmit={this.onSubmit} className="mb-3">
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
						label="Position"
						error={errors?.position}
						helperText={errors?.position}
						variant="standard"
						name="position"
						value={this.state.position}
						onChange={this.onChange}
					>
						{position.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					&ensp;
					<TextField
						className="MuiInputBase-input"
						fullWidth
						id="standard-select-currency"
						select
						label="Stack"
						error={errors?.stack}
						helperText={errors?.stack}
						variant="standard"
						name="stack"
						value={this.state.stack}
						onChange={this.onChange}
					>
						{stack.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<Autocomplete
						multiple
						freeSolo
						name="competence"
						options={competenceList}
						getOptionLabel={option => option}
						onChange={(e, v) => this.onChangeMultiSelect(e, v)}
						value={this.state.competence}
						renderInput={params => (
							<TextField
								{...params}
								name="competence"
								error={errors.competence}
								helperText={errors.competence}
								variant="standard"
								label="Skills"
								placeholder="Add keywords"
								margin="normal"
								fullWidth
							/>
						)}
					/>
					<TextField
						fullWidth
						label="Cost developer (MAN/DAY) (EURO)"
						error={errors?.cout}
						helperText={errors?.cout}
						type="number"
						name="cout"
						value={this.state.cout}
						onChange={this.onChange}
						variant="standard"
					/>
				</CModalBody>
				<CModalFooter className="btn_actions_calendar modal_action">
					<CButton type="submit" color="light" variant="outline" shape="rounded-15">
						<SendIcon />
						Send Email
					</CButton>
				</CModalFooter>
			</form>
		);
	}
}
addUser.propTypes = {
	addUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, { AddUser })(withRouter(addUser));
