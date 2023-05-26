import { React, Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getParamsUser } from '../../../redux/actions/usersActions';
import { updateUser } from '../../../redux/actions/usersActions';

import MenuItem from '@mui/material/MenuItem';
import '../../components/file.css';
import { withRouter } from 'react-router-dom';
import { CButton, CModalFooter, CModalBody, CForm } from '@coreui/react';
import { Autocomplete, Chip, TextField } from '@mui/material';
const competenceList = ['Reactjs', 'symfony', 'javascript', 'angularjs', 'angular'];

class UpdateUser extends Component {
	constructor() {
		super();
		this.state = {
			LightUser: null,

			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	componentWillMount(userId) {
		this.props.getParamsUser(userId);
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
	onChangeMultiSelect(e, v) {
		this.setState({ competence: v });
	}
	handleClick(userId) {
		this.setState({ errors: {} });
		this.props.updateUser(
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

		return (
			<CForm onSubmit={this.onSubmit} className="mb-3">
				<CModalBody>
					<TextField
						disabled
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
						label="Position"
						error={errors?.position}
						helperText={errors?.position}
						variant="standard"
						name="position"
						defaultValue={this.props.userToUpdate?.position || LightUser?.position}
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
						fullWidth
						id="standard-select-currency"
						select
						label="Stack"
						error={errors?.stack}
						helperText={errors?.stack}
						variant="standard"
						name="stack"
						defaultValue={this.props.userToUpdate?.stack || LightUser?.stack}
						onChange={this.onChange}
					>
						{stack.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					&ensp;
					<Autocomplete
						multiple
						freeSolo
						name="competence"
						options={competenceList}
						getOptionLabel={option => option}
						onChange={(e, v) => this.onChangeMultiSelect(e, v)}
						defaultValue={this.props.userToUpdate?.competence || LightUser?.competence}
						renderTags={values => values.map(value => value).join(', ')}
						disableClearable
						forcePopupIcon={false}
						renderInput={params => (
							<TextField
								{...params}
								name="competence"
								error={errors.competence}
								helperText={errors.competence}
								variant="standard"
								label="Skills"
								margin="normal"
								fullWidth
							/>
						)}
					/>
					&ensp;
					<TextField
						fullWidth
						label="Cost developer (MAN/DAY) (EURO)"
						error={errors?.cout}
						helperText={errors?.cout}
						type="number"
						name="cout"
						defaultValue={this.props.userToUpdate?.cout || LightUser?.cout}
						onChange={this.onChange}
						variant="standard"
					/>
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
UpdateUser.propTypes = {
	getParamsUser: PropTypes.func.isRequired,
	archivedUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, { getParamsUser, updateUser })(withRouter(UpdateUser));
