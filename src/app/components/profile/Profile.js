import { React, Component, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getParamsUser } from '../../../redux/actions/usersActions';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { cilBadge, cilChatBubble, cilClone, cilContact } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import vide from '../../../assets/images/avatars/vide.jpg';
import Avatar from '@mui/material/Avatar';
import './profile.css';
import Moment from 'react-moment';

import { CButton, CModal, CModalHeader, CModalTitle, CModalBody } from '@coreui/react';
import UpdateProfile from './UpdateProfile';
class Profile extends Component {
	constructor() {
		super();
		this.state = {
			selectedUser: null,
			errors: {}
		};
	}
	componentWillMount() {
		this.props.match.params.userId && this.props.getParamsUser(this.props.match.params.userId);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth?.selectedUserById) {
			this.setState({ selectedUser: nextProps.auth.selectedUserById });
		}
	}

	render() {
		const visible = this.props.visible;
		const setVisible = this.props.setVisible;
		const { errors } = this.state;
		const { selectedUser } = this.state;

		return (
			<div className="student-profile py-4">
				<div className="container">
					<div className="row">
						<div className="col-lg-4">
							<div className="card shadow-sm">
								<div className="card-header bg-transparent text-center">
									<Avatar
										className="profile_img"
										src={'http://localhost:5000/' + selectedUser?.avatar || vide}
										size="md"
									/>

									<h3>{selectedUser?.name}</h3>
								</div>
								<div className="card-body">
									<p className="mb-0">
										<strong className="pr-1">Score:</strong>
										{selectedUser?.score}
									</p>
									<p className="mb-0">
										<strong className="pr-1">Position:</strong>
										{selectedUser?.position}
									</p>
									<p className="mb-0">
										<strong className="pr-1">Stack:</strong> {selectedUser?.stack}
									</p>
									<p className="mb-0">
										<strong className="pr-1">Company:</strong>MOBELITE
									</p>
									<p className="mb-0">
										<strong className="pr-1">Location:</strong> {selectedUser?.location}
									</p>
								</div>
							</div>
						</div>
						<div className="col-lg-8">
							<div className=" d-md-flex justify-content-md-end">
								<CButton
									style={{ backgroundColor: '#0c8bfd', color: 'white' }}
									color="light"
									onClick={() => setVisible(!visible)}
								>
									{' '}
									Edit profile{' '}
								</CButton>
							</div>

							<div style={{ height: '26px' }}></div>

							<div className="card shadow-sm">
								<div className="card-header bg-transparent border-0">
									<h3 className="mb-0">
										<CIcon icon={cilClone} />
										Bio
									</h3>
								</div>
								<div className="card-body pt-0">
									<p>{selectedUser?.bio}</p>
								</div>
							</div>
							<div style={{ height: '26px' }}></div>
							<div className="card shadow-sm">
								<div className="card-header bg-transparent border-0">
									<h3 className="mb-0">
										<CIcon icon={cilContact} />
										General Information
									</h3>
								</div>
								<div className="card-body pt-0">
									<table className="table table-bordered">
										<tr>
											<th width="30%">Email</th>
											<td width="2%">:</td>
											<td>{selectedUser?.email}</td>
										</tr>
										<tr>
											<th width="30%">phone </th>
											<td width="2%">:</td>
											<td>{selectedUser?.phone}</td>
										</tr>
										<tr>
											<th width="30%">Gender</th>
											<td width="2%">:</td>
											<td>{selectedUser?.gender}</td>
										</tr>
										<tr>
											<th width="30%">Birthday</th>
											<td width="2%">:</td>
											<td>
												<Moment format="DD/MM/YYYY">{selectedUser?.birthday}</Moment>
											</td>
										</tr>
										<tr>
											<th width="30%">Address</th>
											<td width="2%">:</td>
											<td>{selectedUser?.address}</td>
										</tr>
									</table>
								</div>
							</div>
							<div style={{ height: '26px' }}></div>
							<div className="card shadow-sm">
								<div className="card-header bg-transparent border-0">
									<h3 className="mb-0">
										<CIcon icon={cilBadge} />
										Skills{' '}
									</h3>
								</div>
								<div className="card-body pt-0">
									<table className="table table-bordered">
										{selectedUser?.competence?.map(item => (
											<th> {item} </th>
										))}
									</table>
								</div>
							</div>
							<div style={{ height: '26px' }}></div>
							<div className="card shadow-sm">
								<div className="card-header bg-transparent border-0">
									<h3 className="mb-0">
										<CIcon icon={cilChatBubble} />
										Social{' '}
									</h3>
								</div>
								<div className="card-body pt-0">
									<table className="table table-bordered">
										<tr>
											<th width="30%">Linkedin</th>
											<td width="2%">:</td>
											<td></td>
										</tr>
										<tr>
											<th width="30%">Skype </th>
											<td width="2%">:</td>
											<td></td>
										</tr>
										<tr>
											<th width="30%">Facebook</th>
											<td width="2%">:</td>
											<td></td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<CModal
					style={{ backgroundColor: '#0c8bfd', color: 'white' }}
					alignment="center"
					visible={visible}
					onClose={() => setVisible(false)}
				>
					<CModalHeader
						style={{ backgroundColor: '#0c8bfd', color: 'white' }}
						onClose={() => setVisible(false)}
					>
						<CModalTitle>Edit Profile</CModalTitle>
					</CModalHeader>
					<CModalBody>
						<UpdateProfile
							setVisible={setVisible}
							ProfileToUpdate={this.state.selectedUser}
							closeCurrentModal={setVisible}
						/>{' '}
					</CModalBody>
				</CModal>
			</div>
		);
	}
}

function withMyHook(Component) {
	return function WrappedComponent(props) {
		const [visible, setVisible] = useState();

		return <Component {...props} visible={visible} setVisible={setVisible} />;
	};
}
Profile.propTypes = {
	getParamsUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, { getParamsUser })(withMyHook(Profile));
