import { React, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getParamsUser } from '../../../redux/actions/usersActions';
import { archivedAdmin } from '../../../redux/actions/usersActions';
import { withRouter } from 'react-router-dom';

import { CAvatar, CImage } from '@coreui/react';

class DetailsAdmin extends Component {
	constructor() {
		super();
		this.state = {
			email: null,
			departement: null,

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
	handleClick(userId) {
		this.props.archivedAdmin(userId, {
			email: this.state.email,
			departement: this.state.departement
		});
	}

	render() {
		const { errors } = this.state;
		const { LightUser } = this.state;

		return (
			<div>
				<div>
					<CImage src={'http://localhost:5000/' + this.props.userDetails.avatar || vide} size="md" />

					<ul class="list-unstyled">
						<li>Name : {this.props.userDetails?.name}</li>
						<li>Email :{this.props.userDetails?.email}</li>
						<li>Departement : {this.props.userDetails?.departement}</li>

						<li>Phone : {this.props.userDetails?.phone}</li>
						<li>Status : {this.props.userDetails?.status}</li>
					</ul>
				</div>
			</div>
		);
	}
}
DetailsAdmin.propTypes = {
	getParamsUser: PropTypes.func.isRequired,
	archivedAdmin: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, { getParamsUser, archivedAdmin })(withRouter(DetailsAdmin));
