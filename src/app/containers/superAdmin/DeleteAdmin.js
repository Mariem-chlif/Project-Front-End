import { React, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteAdmin } from '../../../redux/actions/usersActions';
import { withRouter } from 'react-router-dom';
import '../../components/file.css';
import { CModalFooter, CButton } from '@coreui/react';
import Button from '@mui/material/Button';

class DeleteAdmin extends Component {
	constructor() {
		super();
	}

	handleClick(UserId) {
		this.props.deleteAdmin(UserId, this.props.closeModal);
	}

	render() {
		return (
			<>
				<label> Do you really want to delete this Admin? this process cannot be undone </label>
				<CModalFooter>
					<CButton onClick={this.props.closeModal} color="light">
						Cancel
					</CButton>
					<CButton
						onClick={() => this.handleClick(this.props.AdminDelete?._id)}
						color="danger"
						textColor="white"
					>
						{' '}
						Delete
					</CButton>
				</CModalFooter>
			</>
		);
	}
}
DeleteAdmin.propTypes = {
	deleteAdmin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	authStore: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, { deleteAdmin })(withRouter(DeleteAdmin));
