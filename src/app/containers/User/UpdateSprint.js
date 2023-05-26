import { React, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSprint } from '../../../redux/actions/sprintsActions';
import { updateSprint } from '../../../redux/actions/sprintsActions';
import { withRouter } from 'react-router-dom';
import '../../components/file.css';
import MenuItem from '@mui/material/MenuItem';
import '../superAdmin/addProject.css';
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

class UpdateSprint extends Component {
	constructor() {
		super();
		this.state = {
			Sprint: null,

			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	componentWillMount(SprintId) {
		console.log(SprintId);
		this.props.getSprint(SprintId);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	handleClick(SprintId) {
		this.setState({ errors: {} });
		this.props.updateSprint(
			SprintId,
			{
				...this.props.sprintToUpdate,
				...this.state
			},

			this.props.closeModale
		);
	}

	render() {
		const { errors } = this.state;

		return (
			<CForm className="mb-3">
				<CModalBody>
					<TextField
						fullWidth
						label="Sprint Title"
						error={errors?.titreSprint}
						helperText={errors?.titreSprint}
						type="text"
						name="titreSprint"
						defaultValue={this.props.sprintToUpdate?.titreSprint || Sprint?.titreSprint}
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
						defaultValue={this.props.sprintToUpdate?.date_Debut || Sprint?.date_Debut}
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
						defaultValue={this.props.sprintToUpdate?.date_Fin || Sprint?.date_Fin}
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
						defaultValue={this.props.sprintToUpdate?.demo || Sprint?.demo}
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
							defaultValue={this.props.sprintToUpdate?.description || Sprint?.description}
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
				<CModalFooter className="btn_actions_calendar">
					<CButton
						color="light"
						variant="outline"
						shape="rounded-15"
						onClick={() => this.handleClick(this.props.sprintToUpdate?._id)}
					>
						UPDATE
					</CButton>
				</CModalFooter>
			</CForm>
		);
	}
}
UpdateSprint.propTypes = {
	getSprint: PropTypes.func.isRequired,
	archivedProject: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, { getSprint, updateSprint })(withRouter(UpdateSprint));
