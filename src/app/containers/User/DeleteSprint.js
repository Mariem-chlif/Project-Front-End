import { React, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteSprint } from '../../../redux/actions/sprintsActions';
import { withRouter } from 'react-router-dom';
import '../../components/file.css';

import Button from '@mui/material/Button';

class DeleteSprint extends Component {
	constructor() {
		super();
	}

	handleClick(sprintId) {
		this.props.deleteSprint(sprintId, this.props.closeModal);
	}

	render() {
		return (
			<>
				<label> Do you really want to delete these Admin? this process cannot be undone </label>
				<Button onClick={this.props.closeModal}> Cancel</Button>
				<Button onClick={() => this.handleClick(this.props.sprintDelete?._id)} color="error">
					{' '}
					Delete
				</Button>
			</>
		);
	}
}
DeleteSprint.propTypes = {
	deleteSprint: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	authStore: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, { deleteSprint })(withRouter(DeleteSprint));
