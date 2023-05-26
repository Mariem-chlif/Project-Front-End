import React from 'react';
import { connect } from 'react-redux';
import { getAllNotifications } from 'src/redux/actions/notification.action';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '.';
import PropTypes from 'prop-types';
const DefaultLayout = props => {
	return (
		<div>
			<AppSidebar {...props} className="wrapper d-flex flex-column min-vh-100 bg-white" />
			<div className="wrapper d-flex flex-column min-vh-100 bg-white">
				<AppHeader {...props} />
				<div className="body flex-grow-1 px-3">
					<AppContent {...props} />
				</div>
				<AppFooter {...props} />
			</div>
		</div>
	);
};
DefaultLayout.prototype = {
	getAllNotifications: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	currentUser: state.auth.user,
	auth: state.auth
});

const mapDispatchToProps = {
	getAllNotifications
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
