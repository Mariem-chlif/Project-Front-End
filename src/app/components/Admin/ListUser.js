import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { getUsers, archivedUser, deleteUser } from 'src/redux/actions/usersActions';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import '../file.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import FormControlLabel from '@mui/material/FormControlLabel';
import './calendar.css';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';

import {
	CTable,
	CTableHead,
	CTableRow,
	CTableHeaderCell,
	CTableDataCell,
	CTableBody,
	CButton,
	CModal,
	CModalHeader,
	CModalTitle,
	CModalBody,
	CAvatar
} from '@coreui/react';
import AddUser from '../../containers/Admin/addUser';
import UpdateUser from 'src/app/containers/Admin/UpdateUser';
import DetailsUser from 'src/app/containers/Admin/DetailsUser';
import GenericFilter from '../GenericFilter';
import DeleteUser from 'src/app/containers/superAdmin/DeleteUser';

export class ListUser extends Component {
	constructor() {
		super();
		this.state = {
			UserLists: null,
			modalState: false,
			sourceUserList: null,
			modalStateDetail: false,
			userArchivedDisplayed: false,
			selectedUser: null,
			archived: true,
			modalStateDelete: false,
			archivedFalse: false
		};
	}

	componentWillMount() {
		if (this.props.authStore?.user) {
			this.props.getUsers(this.props.authStore?.user, { archived: 'false' });
		}
	}

	componentWillReceiveProps(newProps) {
		if (newProps.usersStores) {
			this.setState({
				UserLists: newProps.usersStores.allUsers,
				sourceUserList: newProps.usersStores.allUsers
			});
		}
	}
	changeListState = () =>
		this.setState({
			userArchivedDisplayed: !this.state.userArchivedDisplayed
		});

	handleModalState = value => this.setState({ modalState: value });
	handleModalStateDelete = value => this.setState({ modalStateDelete: value });

	handleModalStateDetail = value => this.setState({ modalStateDetail: value });

	handleClick(userId) {
		this.props.archivedUser(
			userId,
			{
				archived: this.state.archived
			},
			null
		);
	}
	handleClickArchived(userId) {
		this.props.archivedUser(
			userId,
			{
				archived: this.state.archivedFalse
			},
			null,
			'true'
		);
	}
	getId(user) {
		//this.props.getParamsUser(userid);

		this.setState({
			selectedUser: user
		});
	}
	handleListUserChange = data => {
		this.setState({ UserLists: data });
	};

	render() {
		const { UserLists } = this.state;
		const visible = this.props.visible;
		const setVisible = this.props.setVisible;

		return (
			<>
				<div className="btn_actions_calendar top_header_admin_list">
					<span> {this.state?.userArchivedDisplayed ? 'Archived List ' : 'Employee list'}</span>
					<CButton color="light" variant="outline" onClick={() => setVisible(!visible)}>
						{' '}
						<AddIcon />
						Add user
					</CButton>
				</div>
				&ensp;
				<CModal
					style={{ backgroundColor: '#0094ff', color: 'white' }}
					alignment="center"
					visible={visible}
					onClose={() => setVisible(false)}
				>
					<CModalHeader
						style={{ backgroundColor: '#0094ff', color: 'white' }}
						onClose={() => setVisible(false)}
					>
						<CModalTitle>ADD USER</CModalTitle>
					</CModalHeader>
					<CModalBody>
						{' '}
						<AddUser closeCurrentModal={setVisible} />{' '}
					</CModalBody>
				</CModal>
				<div className="fileter_admin_checkbox">
					<GenericFilter
						handleChange={this.handleListUserChange}
						options={this.state.sourceUserList}
						span="user"
						selector="email"
					/>
					<FormControlLabel
						onChange={e => {
							this.changeListState();
							if (e.target.checked)
								this.props.getUsers(this.props.authStore?.user, {
									archived: 'true'
								});
							else
								this.props.getUsers(this.props.authStore?.user, {
									archived: 'false'
								});
						}}
						control={<Checkbox />}
						label={'show archived employees '}
					/>
				</div>
				<CTable align="middle" className="mb-0 border" hover responsive>
					<CTableHead>
						<CTableRow>
							<CTableHeaderCell scope="col"></CTableHeaderCell>
							<CTableHeaderCell scope="col">Email</CTableHeaderCell>
							<CTableHeaderCell scope="col">position</CTableHeaderCell>

							<CTableHeaderCell scope="col">stack</CTableHeaderCell>
							<CTableHeaderCell scope="col">Status</CTableHeaderCell>
							<CTableHeaderCell scope="col">cout</CTableHeaderCell>
							<CTableHeaderCell scope="col">ACTIONS</CTableHeaderCell>
						</CTableRow>
					</CTableHead>
					<CTableBody>
						{UserLists &&
							UserLists.map(item => {
								return (
									<CTableRow>
										<CTableDataCell>
											{' '}
											<Avatar src={'http://localhost:5000/' + item.avatar || vide} size="md" />
										</CTableDataCell>
										<CTableDataCell>{item.email}</CTableDataCell>
										<CTableDataCell>{item.position}</CTableDataCell>

										<CTableDataCell>{item.stack}</CTableDataCell>
										<CTableDataCell>
											{' '}
											{item?.status === 'active' ? (
												<Chip label={item?.status} style={{ width: '100px' }} color="success" />
											) : (
												<Chip label={item?.status} style={{ width: '100px' }} color="warning" />
											)}
										</CTableDataCell>
										<CTableDataCell>{item.cout}</CTableDataCell>
										<CTableDataCell>
											&ensp;
											<PopupState variant="popover" popupId="demo-popup-menu">
												{popupState =>
													item?.archived ? (
														<>
															<Button
																style={{ color: 'black' }}
																variant="text"
																{...bindTrigger(popupState)}
															>
																<MoreVertIcon />
															</Button>
															<Menu {...bindMenu(popupState)}>
																<MenuItem
																	onClick={() => {
																		this.getId(item);
																		this.handleModalStateDelete(true);
																	}}
																>
																	Delete
																</MenuItem>
																<MenuItem
																	onClick={() => this.handleClickArchived(item._id)}
																>
																	annulled
																</MenuItem>
															</Menu>
														</>
													) : (
														<>
															<Button
																style={{ color: 'black' }}
																variant="text"
																{...bindTrigger(popupState)}
															>
																<MoreVertIcon />
															</Button>
															<Menu {...bindMenu(popupState)}>
																<MenuItem
																	onClick={() => {
																		this.getId(item);
																		this.handleModalStateDetail(true);
																	}}
																>
																	Profile
																</MenuItem>
																<MenuItem
																	onClick={() => {
																		this.getId(item);
																		this.handleModalState(true);
																	}}
																>
																	Edit
																</MenuItem>
																<MenuItem onClick={() => this.handleClick(item._id)}>
																	remove
																</MenuItem>
															</Menu>
														</>
													)
												}
											</PopupState>
										</CTableDataCell>
									</CTableRow>
								);
							})}
					</CTableBody>
				</CTable>
				<CModal
					style={{ backgroundColor: '#0094ff', color: 'white' }}
					alignment="center"
					visible={this.state.modalState}
					onClose={() => this.handleModalState()}
				>
					<CModalHeader
						style={{ backgroundColor: '#0094ff', color: 'white' }}
						onClose={() => this.handleModalState()}
					>
						<CModalTitle>update User</CModalTitle>
					</CModalHeader>
					<CModalBody>
						{' '}
						<UpdateUser
							userToUpdate={this.state.selectedUser}
							closeModale={() => this.handleModalState(false)}
						/>{' '}
					</CModalBody>
				</CModal>
				<CModal
					style={{ backgroundColor: '#0094ff', color: 'white' }}
					alignment="center"
					visible={this.state.modalStateDetail}
					onClose={() => this.handleModalStateDetail()}
				>
					<CModalHeader
						style={{ backgroundColor: '#0094ff', color: 'white' }}
						onClose={() => this.handleModalStateDetail()}
					>
						<CModalTitle>Details User</CModalTitle>
					</CModalHeader>
					<CModalBody>
						{' '}
						<DetailsUser
							userDetails={this.state.selectedUser}
							closeModale={() => this.handleModalStateDetail(false)}
						/>{' '}
					</CModalBody>
				</CModal>
				<CModal
					style={{ backgroundColor: '#0094ff', color: 'white' }}
					alignment="center"
					visible={this.state.modalStateDelete}
					onClose={() => this.handleModalStateDelete()}
				>
					<CModalHeader onClose={() => this.handleModalStateDelete()}>
						<CModalTitle>Are you sure ?</CModalTitle>
					</CModalHeader>
					<CModalBody>
						<DeleteUser UserDelete={this.state.selectedUser} />
					</CModalBody>
				</CModal>
			</>
		);
	}
}

function withMyHook(Component) {
	return function WrappedComponent(props) {
		const [visible, setVisible] = useState();

		return <Component {...props} visible={visible} setVisible={setVisible} />;
	};
}
ListUser.propTypes = {
	authStore: PropTypes.object.isRequired,
	getUsers: PropTypes.func.isRequired,
	deleteUser: PropTypes.func.isRequired,
	archivedUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	usersStores: state.users,
	authStore: state.auth
});

export default connect(mapStateToProps, { getUsers, archivedUser, deleteUser })(withMyHook(ListUser));
