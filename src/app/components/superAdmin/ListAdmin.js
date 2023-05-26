import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { getAdmins, deleteAdmin } from '../../../redux/actions/usersActions';
import { getParamsUser } from '../../../redux/actions/usersActions';
import PropTypes from 'prop-types';
import { archivedAdmin } from '../../../redux/actions/usersActions';

import Avatar from '@mui/material/Avatar';
import vide from '../../../../src/assets/images/avatars/vide.jpg';
import AddIcon from '@mui/icons-material/Add';
import '../file.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import FormControlLabel from '@mui/material/FormControlLabel';

import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Chip from '@mui/material/Chip';
import './calendar.css';
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
	CModalBody
} from '@coreui/react';
import AddAdmin from '../../containers/superAdmin/AddAdmin';
import UpdateAdmin from '../../containers/superAdmin/UpdateAdmin';

import DetailsAdmin from 'src/app/containers/superAdmin/DetailsAdmin';
import GenericFilter from '../GenericFilter';
import DeleteAdmin from 'src/app/containers/superAdmin/DeleteAdmin';

export class ListAdmin extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			archived: true,
			archivedFalse: false,
			adminLists: null,
			sourceAdminList: null,
			adminArchivedDisplayed: false,
			modalState: false,
			modalStatedetail: false,
			modalStateDelete: false,
			selectedAdmin: null
		};
	}

	componentWillMount() {
		this.props.getAdmins({ archived: 'false' });
	}
	handleModalState = value => this.setState({ modalState: value });

	handleModalStatedetail = value => this.setState({ modalStatedetail: value });

	componentWillReceiveProps(newProps) {
		if (newProps.usersStores) {
			this.setState({
				adminLists: newProps.usersStores.allAdmins,
				sourceAdminList: newProps.usersStores.allAdmins
			});
		}
	}
	handleClick(userId) {
		const archived = this.props.archivedAdmin(userId, {
			archived: this.state.archived
		});
	}
	changeListState = () =>
		this.setState({
			adminArchivedDisplayed: !this.state.adminArchivedDisplayed
		});
	handleModalStatedelete = value => this.setState({ modalStateDelete: value });
	handleClickArchived(userId) {
		const archived = this.props.archivedAdmin(
			userId,
			{
				archived: this.state.archivedFalse
			},
			'true'
		);
	}
	getId(user) {
		// this.props.getParamsUser(userid);

		this.setState({
			selectedAdmin: user
		});
	}
	handleListAdminChange = data => {
		this.setState({ adminLists: data });
	};
	render() {
		const { adminLists } = this.state;
		const visible = this.props.visible;
		const setVisible = this.props.setVisible;

		return (
			<div>
				<div className="btn_actions_calendar top_header_admin_list">
					<span> {this.state?.adminArchivedDisplayed ? 'Archived List ' : 'Admin list'}</span>
					<CButton color="light" variant="outline" onClick={() => setVisible(!visible)}>
						<AddIcon />
						Add Admin
					</CButton>
				</div>
				&ensp;
				<CModal
					style={{ backgroundColor: '	#0094ff ', color: 'white' }}
					alignment="center"
					visible={visible}
					onClose={() => setVisible(false)}
				>
					<CModalHeader
						style={{ backgroundColor: '	#0094ff ', color: 'white' }}
						onClose={() => setVisible(false)}
					>
						<CModalTitle>ADD ADMIN</CModalTitle>
					</CModalHeader>
					<CModalBody>
						{' '}
						<AddAdmin closeCurrentModal={setVisible} />{' '}
					</CModalBody>
				</CModal>
				<div className="fileter_admin_checkbox">
					<GenericFilter
						handleChange={this.handleListAdminChange}
						options={this.state.sourceAdminList}
						span="user"
						selector="email"
					/>

					<FormControlLabel
						onChange={e => {
							this.changeListState();
							if (e.target.checked) this.props.getAdmins({ archived: 'true' });
							else this.props.getAdmins({ archived: 'false' });
						}}
						control={<Checkbox />}
						label={'show archived admins'}
					/>
				</div>
				<CTable align="middle" className="mb-0 border" hover responsive>
					<CTableHead>
						<CTableRow>
							<CTableHeaderCell scope="col"></CTableHeaderCell>
							<CTableHeaderCell scope="col">Email</CTableHeaderCell>
							<CTableHeaderCell scope="col">Departement</CTableHeaderCell>

							<CTableHeaderCell scope="col">Status</CTableHeaderCell>

							<CTableHeaderCell scope="col">ACTIONS</CTableHeaderCell>
						</CTableRow>
					</CTableHead>
					<CTableBody>
						{adminLists &&
							adminLists.map(item => {
								return (
									<CTableRow>
										<CTableDataCell>
											{' '}
											<Avatar src={'http://localhost:5000/' + item.avatar || vide} size="md" />
										</CTableDataCell>
										<CTableDataCell>{item.email}</CTableDataCell>
										<CTableDataCell>{item.departement}</CTableDataCell>

										<CTableDataCell>
											{item?.status === 'active' ? (
												<Chip label={item?.status} style={{ width: '100px' }} color="success" />
											) : (
												<Chip label={item?.status} style={{ width: '100px' }} color="warning" />
											)}
										</CTableDataCell>
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
																		this.handleModalStatedelete(true);
																	}}
																>
																	{' '}
																	Delete
																</MenuItem>
																<MenuItem
																	onClick={() => this.handleClickArchived(item._id)}
																>
																	reset
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
																		this.handleModalStatedetail(true);
																	}}
																>
																	Info
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
					visible={this.state.modalStatedetail}
					onClose={() => this.handleModalStatedetail()}
				>
					<CModalHeader
						style={{ backgroundColor: '#0094ff', color: 'white' }}
						onClose={() => this.handleModalStatedetail()}
					>
						<CModalTitle>DETAILS ADMIN</CModalTitle>
					</CModalHeader>
					<CModalBody>
						{' '}
						<DetailsAdmin userDetails={this.state.selectedAdmin} />{' '}
					</CModalBody>
				</CModal>
				&ensp;
				<CModal
					style={{ backgroundColor: '#0094ff', color: 'white' }}
					alignment="center"
					visible={this.state.modalStateDelete}
					onClose={() => this.handleModalStatedelete()}
				>
					<CModalHeader onClose={() => this.handleModalStatedelete()}>
						<CModalTitle>Are you sure ?</CModalTitle>
					</CModalHeader>
					<CModalBody>
						<DeleteAdmin AdminDelete={this.state.selectedAdmin} />
					</CModalBody>
				</CModal>
			</div>
		);
	}
}

function withMyHook(Component) {
	return function WrappedComponent(props) {
		const [visible, setVisible] = useState();
		const [visibleSm, setVisibleSm] = useState(false);

		return (
			<Component
				{...props}
				visible={visible}
				setVisible={setVisible}
				visibleSm={visibleSm}
				setVisibleSm={setVisibleSm}
			/>
		);
	};
}

ListAdmin.propTypes = {
	getAdmins: PropTypes.func.isRequired,
	archivedAdmin: PropTypes.func.isRequired,
	deleteAdmin: PropTypes.func.isRequired,
	getParamsUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	usersStores: state.users
});

export default connect(mapStateToProps, {
	getAdmins,
	archivedAdmin,
	getParamsUser,
	deleteAdmin
})(withMyHook(ListAdmin));
