import { React, Component, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addProject } from '../../../redux/actions/projectsActions';
import { withRouter } from 'react-router-dom';
import '../../components/file.css';
import MenuItem from '@mui/material/MenuItem';
import './addProject.css';
import { CButton, CModalFooter, CModalBody, CForm } from '@coreui/react';
import Button from '@mui/material/Button';
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

class AddProject extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			frontEnd: '',
			backEnd: '',
			date_Debut: '',
			date_Fin: '',
			stack: '',
			Nombre_employee: '',
			budget: '',
			description: '',

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
		const project = {
			name: this.state.name,
			date_Debut: this.state.date_Debut,
			date_Fin: this.state.date_Fin,
			stack: this.state.stack,
			Nombre_employee: this.state.Nombre_employee,
			budget: this.state.budget,
			frontEnd: this.state.frontEnd,
			backEnd: this.state.backEnd,
			description: this.state.description
		};
		this.props.addProject(project, this.props.closeCurrentModal);
	}

	render() {
		const { errors } = this.state;

		const stack = [
			{ label: 'WEB', value: 'WEB' },
			{ label: 'MOBILE', value: 'MOBILE' }
		];

		return (
			<CForm onSubmit={this.onSubmit} className="add_project_modal  ">
				<TextField
					className="TextField"
					fullWidth
					label="Project Name"
					error={errors?.name}
					helperText={errors?.name}
					type="name"
					name="name"
					value={this.state.name}
					onChange={this.onChange}
					variant="outlined"
				/>
				<div className="block_form">
					<TextField
						className="TextField"
						fullWidth
						id="standard-select-currency"
						select
						label="Stack"
						error={errors?.stack}
						helperText={errors?.stack}
						variant="outlined"
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

					<TextField
						fullWidth
						className="TextField"
						id="standard-select-currency"
						select
						label="Front end technology"
						error={errors?.frontEnd}
						helperText={errors?.frontEnd}
						variant="outlined"
						name="frontEnd"
						value={this.state.frontEnd}
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
						error={errors?.backEnd}
						helperText={errors?.backEnd}
						variant="outlined"
						name="backEnd"
						value={this.state.backEnd}
						onChange={this.onChange}
					>
						{backEnd.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</div>
				<div className="block_form">
					{' '}
					<TextField
						className="TextField"
						fullWidth
						label="Date Debut"
						error={errors?.date_Debut}
						helperText={errors?.date_Debut}
						type="date"
						InputLabelProps={{ shrink: true, required: true }}
						name="date_Debut"
						value={this.state.date_Debut}
						onChange={this.onChange}
						variant="outlined"
					/>
					<TextField
						className="TextField"
						fullWidth
						label="Date Fin"
						error={errors?.date_Fin}
						helperText={errors?.date_Fin}
						type="date"
						InputLabelProps={{ shrink: true, required: true }}
						name="date_Fin"
						value={this.state.date_Fin}
						onChange={this.onChange}
						variant="outlined"
					/>
				</div>{' '}
				<div className="block_form">
					<TextField
						className="TextField"
						fullWidth
						label="Budget Project"
						type="number"
						name="budget"
						inputProps={{ min: 1, step: 1000 }}
						error={errors?.budget}
						helperText={errors?.budget}
						value={this.state.budget}
						onChange={this.onChange}
						variant="outlined"
					/>
					<TextField
						className="TextField"
						fullWidth
						label="Number of empolyee"
						error={errors?.Nombre_employee}
						helperText={errors?.Nombre_employee}
						type="number"
						inputProps={{ min: 1, step: 10 }}
						name="Nombre_employee"
						value={this.state.Nombre_employee}
						onChange={this.onChange}
						variant="outlined"
					/>
				</div>
				<div className="block_form">
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
						variant="outlined"
					/>{' '}
				</div>
				<CModalFooter className="btn_actions_calendar modal_action">
					<CButton type="submit" variant="outline" color="light" shape="rounded-15">
						ADD PROJECT
					</CButton>
				</CModalFooter>
			</CForm>
		);
	}
}

AddProject.propTypes = {
	addProject: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, { addProject })(withRouter(AddProject));
