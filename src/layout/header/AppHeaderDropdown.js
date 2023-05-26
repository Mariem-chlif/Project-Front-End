import React, { Component } from 'react';
import {
	CAvatar,
	CBadge,
	CDropdown,
	CDropdownDivider,
	CDropdownHeader,
	CDropdownItem,
	CDropdownMenu,
	CDropdownToggle
} from '@coreui/react';
import { cilBell, cilEnvelopeOpen, cilLockLocked, cilSettings, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import avatar8 from '../../assets/images/avatars/8.jpg';
import { logoutUser } from 'src/redux/actions/authActions';
import { Redirect } from 'react-router';
import './header.scss';
class AppHeaderDropdown extends Component {
	onLogoutClick(e) {
		e.preventDefault();
		this.props.logoutUser();
	}
	render() {
		const { isAuthenticated, user } = this.props.auth;
		if (isAuthenticated) {
			return (
				<CDropdown variant="nav-item" className="">
					<CDropdownToggle placement="bottom-end" className="header_profile py-0" caret={false}>
						{user?.name}
						<Avatar src={'http://localhost:5000/' + user?.avatar || avatar8} size="md" />
					</CDropdownToggle>
					<CDropdownMenu className="pt-0" placement="bottom-end">
						<CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
						<CDropdownItem href="#">
							<CIcon icon={cilBell} className="me-2" />
							Updates
						</CDropdownItem>
						<CDropdownItem href="#">
							<CIcon icon={cilEnvelopeOpen} className="me-2" />
							Messages
						</CDropdownItem>
						<CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
						<CDropdownItem href={`/profile/${this.props.auth?.user?._id}`}>
							<CIcon icon={cilUser} className="me-2" />
							Profile
						</CDropdownItem>
						<CDropdownItem href="#">
							<CIcon icon={cilSettings} className="me-2" />
							Settings
						</CDropdownItem>
						<CDropdownDivider />
						<CDropdownItem href="" onClick={this.onLogoutClick.bind(this)}>
							<CIcon icon={cilLockLocked} className="me-2" />
							Lock Account
						</CDropdownItem>
					</CDropdownMenu>
				</CDropdown>
			);
		}
		if (!isAuthenticated) {
			return <Redirect to="/login" />;
		}
	}
}

AppHeaderDropdown.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(AppHeaderDropdown);
