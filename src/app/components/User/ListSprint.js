import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { getSprint, archivedSprint, deleteSprint } from 'src/redux/actions/sprintsActions';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import '../superAdmin/calendar.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import FormControlLabel from '@mui/material/FormControlLabel';

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
import AddSprint from '../../containers/User/AddSprint';
import UpdateSprint from 'src/app/containers/User/UpdateSprint';
import DetailsSprint from 'src/app/containers/User/DetailsSprint';
import GenericFilter from '../GenericFilter';
import Deletesprint from 'src/app/containers/User/DeleteSprint';

export class ListSprint extends Component {
	constructor() {
		super();
		this.state = {
			sprintLists: null,

			modalState: false,
			sourceSprintList: null,
			modalStatedetail: false,
			sprintArchivedDisplayed: false,
			selectedSprint: null,
			archived: true,
			modalStateDelete: false,
			archivedFalse: false
		};
	}

	componentWillMount() {
		if (this.props.authStore?.user) {
			this.props.getSprint(this.props.authStore?.user, { archived: 'false' });
		}
	}

	componentWillReceiveProps(newProps) {
		if (newProps.sprintsStores) {
			console.log('klksjdlsqjd', newProps.sprintsStores.allSprints);
			this.setState({
				sprintLists: newProps.sprintsStores.allSprints,
				sourceSprintList: newProps.sprintsStores.allSprints
			});
		}
	}
	changeListState = () =>
		this.setState({
			sprintArchivedDisplayed: !this.state.sprintArchivedDisplayed
		});

	handleModalState = value => this.setState({ modalState: value });
	handleModalStatedelete = value => this.setState({ modalStateDelete: value });

	handleModalStatedetail = value => this.setState({ modalStatedetail: value });

	handleClick(SprintId) {
		this.props.archivedSprint(
			SprintId,
			{
				archived: this.state.archived
			},
			null
		);
	}
	handleClickArchived(SprintId) {
		this.props.archivedSprint(
			SprintId,
			{
				archived: this.state.archivedFalse
			},
			null,
			'true'
		);
	}
	getId(sprint) {
		//this.props.getParamsUser(userid);

		this.setState({
			selectedSprint: sprint
		});
	}
	handleListSprintChange = data => {
		this.setState({ sprintLists: data });
	};

	render() {
		const { sprintLists } = this.state;
		const visible = this.props.visible;
		const setVisible = this.props.setVisible;
		console.log(sprintLists);
		return (
			<>
				<div className="btn_actions_calendar top_header_admin_list">
					<span> {this.state?.sprintArchivedDisplayed ? 'Archived List ' : 'Sprint list'}</span>
					<CButton color="light" variant="outline" onClick={() => setVisible(!visible)}>
						{' '}
						<AddIcon />
						Add sprint
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
						<CModalTitle>ADD Sprint</CModalTitle>
					</CModalHeader>
					<CModalBody>
						{' '}
						<AddSprint closeCurrentModal={setVisible} />{' '}
					</CModalBody>
				</CModal>
				<div className="fileter_admin_checkbox">
					<GenericFilter
						handleChange={this.handleListSprintChange}
						options={this.state.sourceSprintList}
						span="sprint"
						selector="titreSprint"
					/>
					<FormControlLabel
						onChange={e => {
							this.changeListState();
							if (e.target.checked)
								this.props.getSprint(this.props.authStore?.user, {
									archived: 'true'
								});
							else
								this.props.getSprint(this.props.authStore?.user, {
									archived: 'false'
								});
						}}
						control={<Checkbox />}
						label={'show archived sprints'}
					/>
				</div>
				<CTable align="middle" className="mb-0 border" hover responsive>
					<CTableHead>
						<CTableRow>
							<CTableHeaderCell scope="col"></CTableHeaderCell>
							<CTableHeaderCell scope="col">Sprint Title</CTableHeaderCell>
							<CTableHeaderCell scope="col">Start date</CTableHeaderCell>

							<CTableHeaderCell scope="col">End date</CTableHeaderCell>

							<CTableHeaderCell scope="col">Demo</CTableHeaderCell>
							<CTableHeaderCell scope="col">Status</CTableHeaderCell>
							<CTableHeaderCell scope="col">ACTIONS</CTableHeaderCell>
						</CTableRow>
					</CTableHead>
					<CTableBody>
						{sprintLists &&
							sprintLists.map(item => {
								return (
									<CTableRow>
										<CTableDataCell> </CTableDataCell>
										<CTableDataCell>{item.titreSprint}</CTableDataCell>
										<CTableDataCell>{item.date_Debut}</CTableDataCell>

										<CTableDataCell>{item.date_Fin}</CTableDataCell>
										<CTableDataCell>{item.demo}</CTableDataCell>
										<CTableDataCell>
											{' '}
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
																		this.handleModalStatedetail(true);
																	}}
																>
																	Info
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
						<CModalTitle>update sprint</CModalTitle>
					</CModalHeader>
					<CModalBody>
						{' '}
						<UpdateSprint
							sprintToUpdate={this.state.selectedSprint}
							closeModale={() => this.handleModalState(false)}
						/>{' '}
					</CModalBody>
				</CModal>
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
						<CModalTitle>Details Sprint</CModalTitle>
					</CModalHeader>
					<CModalBody>
						{' '}
						<DetailsSprint
							sprintDetails={this.state.selectedSprint}
							closeModale={() => this.handleModalStatedetail(false)}
						/>{' '}
					</CModalBody>
				</CModal>
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
						<Deletesprint sprintDelete={this.state.selectedSprint} />
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
ListSprint.propTypes = {
	authStore: PropTypes.object.isRequired,
	getSprint: PropTypes.func.isRequired,

	deleteSprint: PropTypes.func.isRequired,
	archivedSprint: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	sprintsStores: state.sprints,

	authStore: state.auth
});

export default connect(mapStateToProps, { getSprint, archivedSprint, deleteSprint })(withMyHook(ListSprint));
