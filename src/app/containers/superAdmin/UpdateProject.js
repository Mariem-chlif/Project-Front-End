import { React, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProject } from '../../../redux/actions/projectsActions';
import { updateProject } from '../../../redux/actions/projectsActions';
import { withRouter } from 'react-router-dom';
import '../../components/file.css';
import MenuItem from '@mui/material/MenuItem';
import './addProject.css';
import { CButton, CModalFooter, CModalBody, CForm } from '@coreui/react';
import { TextField } from '@mui/material';
const frontEnd = [
	{ label: 'React', value: 'React' },
	{ label: 'Angular', value: 'Angular' }
];
const backEnd = [
	{ label: 'php', value: 'php' },
	{ label: 'nodejs', value: 'nodejs' },
	{ label: 'symfony', value: 'symfony' }
];

class UpdateProject extends Component {
	constructor() {
		super();
		this.state = {
			Project: null,

			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	componentWillMount(Projectid) {
		this.props.getProject(Projectid);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
		if (nextProps.auth) {
			this.setState({ Project: nextProps.auth.Project });
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	handleClick(ProjectId) {
		this.setState({ errors: {} });
		this.props.updateProject(
			ProjectId,
			{
				...this.props.ProjectToUpdate,
				...this.state
			},

			this.props.closeModale
		);
	}

	render() {
		const { errors } = this.state;
		const { Project } = this.state;
		const stack = [
			{ label: 'WEB', value: 'WEB' },
			{ label: 'MOBILE', value: 'MOBILE' }
		];

		return (
			<CForm className="mb-3">
				<CModalBody>
					<TextField
						className="TextField"
						fullWidth
						label="Project Name"
						error={errors?.name}
						InputLabelProps={{ shrink: true, required: true }}
						helperText={errors?.name}
						name="name"
						defaultValue={this.props.ProjectToUpdate?.name || Project?.name}
						onChange={this.onChange}
						variant="standard"
					/>
					<TextField
						className="TextField"
						fullWidth
						id="standard-select-currency"
						select
						label="Stack"
						InputLabelProps={{ shrink: true, required: true }}
						error={errors?.stack}
						helperText={errors?.stack}
						variant="standard"
						name="stack"
						defaultValue={this.props.ProjectToUpdate?.stack || Project?.stack}
						onChange={this.onChange}
					>
						{stack.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<TextField
						className="TextField"
						fullWidth
						id="standard-select-currency"
						select
						label="Front end technology"
						InputLabelProps={{ shrink: true, required: true }}
						error={errors?.frontEnd}
						helperText={errors?.frontEnd}
						variant="standard"
						name="frontEnd"
						defaultValue={this.props.ProjectToUpdate?.frontEnd || Project?.frontEnd}
						onChange={this.onChange}
					>
						{frontEnd.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<TextField
						className="TextField"
						fullWidth
						id="standard-select-currency"
						select
						label="Back end technology"
						InputLabelProps={{ shrink: true, required: true }}
						error={errors?.backEnd}
						helperText={errors?.backEnd}
						variant="standard"
						name="backEnd"
						defaultValue={this.props.ProjectToUpdate?.backEnd || Project?.backEnd}
						onChange={this.onChange}
					>
						{backEnd.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<TextField
						className="TextField"
						fullWidth
						label="Date Debut"
						InputLabelProps={{ shrink: true, required: true }}
						error={errors?.date_Debut}
						helperText={errors?.date_Debut}
						type="date"
						name="date_Debut"
						defaultValue={this.props.ProjectToUpdate?.date_Debut || Project?.date_Debut}
						onChange={this.onChange}
						variant="standard"
					/>
					<TextField
						className="TextField"
						fullWidth
						label="Date Fin"
						error={errors?.date_Fin}
						InputLabelProps={{ shrink: true, required: true }}
						helperText={errors?.date_Fin}
						type="date"
						name="date_Fin"
						defaultValue={this.props.ProjectToUpdate?.date_Fin || Project?.date_Fin}
						onChange={this.onChange}
						variant="standard"
					/>

					<TextField
						className="TextField"
						fullWidth
						label="Number of empolyee"
						error={errors?.Nombre_employee}
						InputLabelProps={{ shrink: true, required: true }}
						helperText={errors?.Nombre_employee}
						type="number"
						name="Nombre_employee"
						defaultValue={this.props.ProjectToUpdate?.Nombre_employee || Project?.Nombre_employee}
						onChange={this.onChange}
						variant="standard"
					/>
					<TextField
						className="TextField"
						fullWidth
						label="budget"
						error={errors?.budget}
						InputLabelProps={{ shrink: true, required: true }}
						helperText={errors?.budget}
						type="number"
						inputProps={{ min: 1, step: 1000 }}
						name="budget"
						defaultValue={this.props.ProjectToUpdate?.budget || Project?.budget}
						onChange={this.onChange}
						variant="standard"
					/>
					<TextField
						multiline
						rows={4}
						className="TextField"
						fullWidth
						label="Description"
						InputLabelProps={{ shrink: true, required: true }}
						error={errors?.description}
						helperText={errors?.description}
						type="Text"
						inputProps={{ min: 1, step: 10 }}
						name="description"
						defaultValue={this.props.ProjectToUpdate?.description || Project?.description}
						onChange={this.onChange}
						variant="standard"
					/>
				</CModalBody>
				<CModalFooter className="btn_actions_calendar">
					<CButton
						color="light"
						variant="outline"
						shape="rounded-15"
						onClick={() => this.handleClick(this.props.ProjectToUpdate?._id)}
					>
						UPDATE
					</CButton>
				</CModalFooter>
			</CForm>
		);
	}
}
UpdateProject.propTypes = {
	getProject: PropTypes.func.isRequired,
	archivedProject: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, { getProject, updateProject })(withRouter(UpdateProject));
