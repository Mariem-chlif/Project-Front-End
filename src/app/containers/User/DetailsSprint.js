import { React, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

class DetailsSprint extends Component {
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
	}

	render() {
		return (
			<div>
				<div>
					<ul class="list-unstyled">
						<li>Sprint Title : {this.props.sprintDetails?.titreSprint}</li>
						<li>start date :{this.props.sprintDetails?.date_Debut}</li>
						<li>End date : {this.props.sprintDetails?.date_Fin}</li>
						<li>Demo : {this.props.sprintDetails?.demo}</li>
						<li>Description : {this.props.sprintDetails?.description}</li>
					</ul>
				</div>
			</div>
		);
	}
}
DetailsSprint.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, {})(withRouter(DetailsSprint));
