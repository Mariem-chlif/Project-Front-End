import { React, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSprint } from '../../../redux/actions/sprintsActions';
import { getProject } from 'src/redux/actions/projectsActions';
import { withRouter } from 'react-router-dom';
import Input from '@mui/material/Input';
import '../../components/file.css';
import MenuItem from '@mui/material/MenuItem';
import { CButton, CModalFooter, CModalBody, CFormSelect } from '@coreui/react';
import { Autocomplete, TextField } from '@mui/material';

class AddSprint extends Component {
	constructor() {
		super();
		this.state = {
			ProjectLists: null,
			project: '',
			titreSprint: '',
			date_Debut: '',
			date_Fin: '',
			demo: '',
			description: '',

			displaySocialInputs: false,
			userListsssss: null,

			errors: {}
		};
		this.onChange = this.onChange.bind(this);

		this.onSubmit = this.onSubmit.bind(this);
	}
	componentDidMount(userid) {
		if (this.props.authStore?.user) {
			this.props.getProject(this.props.authStore?.user);
		}
	}

	componentWillReceiveProps(nextProps, newProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
		if (newProps.projectStores) {
			this.setState({
				ProjectLists: newProps.projectStores.allProjects
			});
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		const sprint = {
			titreSprint: this.state.titreSprint,
			date_Debut: this.state.date_Debut,
			date_Fin: this.state.date_Fin,
			demo: this.state.demo,
			description: this.state.description
		};
		this.props.addSprint(sprint, this.props.closeCurrentModal);
	}

	render() {
		const { errors } = this.state;
		const { ProjectLists } = this.state;

		return (
			<form onSubmit={this.onSubmit} className="mb-3">
				<CModalBody>
					<TextField
						className="MuiInputBase-input"
						fullWidth
						id="standard-select-currency"
						select
						label="project"
						error={errors?.assignedProjects}
						helperText={errors?.assignedProjects}
						variant="standard"
						name="assignedProjects"
						value={this.state.assignedProjects}
						onChange={this.onChange}
					>
						{ProjectLists &&
							ProjectLists.map(item => (
								<MenuItem>
									{item?.name}
									&ensp;
								</MenuItem>
							))}
					</TextField>
					<CFormSelect id="inputGroupSelect01" onChange={this.onChange}>
						{ProjectLists &&
							ProjectLists.map(item => {
								return <option>{item?.name}</option>;
							})}
					</CFormSelect>
					<TextField
						fullWidth
						label="Sprint Title"
						error={errors?.titreSprint}
						helperText={errors?.titreSprint}
						type="text"
						name="titreSprint"
						value={this.state.titreSprint}
						onChange={this.onChange}
						variant="standard"
					/>
					&ensp;
					<TextField
						fullWidth
						label="Start date"
						error={errors?.date_Debut}
						helperText={errors?.date_Debut}
						type="date"
						name="date_Debut"
						InputLabelProps={{ shrink: true, required: true }}
						value={this.state.date_Debut}
						onChange={this.onChange}
						variant="standard"
					/>
					&ensp;
					<TextField
						fullWidth
						label="End date"
						error={errors?.date_Fin}
						helperText={errors?.date_Fin}
						InputLabelProps={{ shrink: true, required: true }}
						type="date"
						name="date_Fin"
						value={this.state.date_Fin}
						onChange={this.onChange}
						variant="standard"
					/>
					&ensp;
					<TextField
						fullWidth
						label="Demo"
						error={errors?.demo}
						helperText={errors?.demo}
						InputLabelProps={{ shrink: true, required: true }}
						type="date"
						name="demo"
						value={this.state.demo}
						onChange={this.onChange}
						variant="standard"
					/>
					&ensp;
					<div>
						<TextField
							multiline
							rows={4}
							className="TextField"
							fullWidth
							label="Description"
							error={errors?.description}
							helperText={errors?.description}
							type="Text"
							inputProps={{ min: 1, step: 10 }}
							name="description"
							value={this.state.description}
							onChange={this.onChange}
							variant="standard"
						/>{' '}
					</div>
				</CModalBody>
				<CModalFooter className="btn_actions_calendar modal_action">
					<CButton type="submit" color="light" variant="outline" shape="rounded-15">
						Add Sprint
					</CButton>
				</CModalFooter>
			</form>
		);
	}
}
AddSprint.propTypes = {
	addSprint: PropTypes.func.isRequired,
	getProject: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	projectStores: state.projects,
	errors: state.errors
});
export default connect(mapStateToProps, { addSprint, getProject })(withRouter(AddSprint));
