import { React, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getParamsUser } from '../../../redux/actions/usersActions';
import { archivedUser } from '../../../redux/actions/usersActions';
import { withRouter } from 'react-router-dom';

class DetailsAdmin extends Component {
	constructor() {
		super();
		this.state = {
			email: null,
			stack: null,
			position: null,
			competence: null,

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
		this.props.archivedUser(userId, {
			email: this.state.email,
			stack: this.state.stack,
			position: this.state.position,
			competence: this.state.competence
		});
	}

	render() {
		return (
			<div>
				<div>
					<ul class="list-unstyled">
						<li>Name : {this.props.userDetails?.name}</li>
						<li>Email :{this.props.userDetails?.email}</li>
						<li>stack : {this.props.userDetails?.stack}</li>
						<li>position : {this.props.userDetails?.position}</li>
						<li>competence : {this.props.userDetails?.competence}</li>

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
	archivedUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, { getParamsUser, archivedUser })(withRouter(DetailsAdmin));
