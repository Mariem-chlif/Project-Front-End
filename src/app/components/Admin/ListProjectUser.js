import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { getProject } from '../../../redux/actions/projectsActions';
import { archivedProject } from '../../../redux/actions/projectsActions';
import AddIcon from '@mui/icons-material/Add';
import CIcon from '@coreui/icons-react';
import PropTypes from 'prop-types';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
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
import AddProject from '../../containers/superAdmin/AddProject';
import { cilLibraryAdd } from '@coreui/icons';
import UpdateProject from 'src/app/containers/superAdmin/UpdateProject';
import DetailsProject from 'src/app/containers/superAdmin/DetailsProject';
import AssignProject from 'src/app/containers/superAdmin/AssignProject';
import './custom_style.scss';
import SocketProvider from 'src/helpers/socket';
function getParameterByName(name) {
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
export class ListProjectUser extends Component {
	constructor() {
		super();
		this.state = {
			projectLists: null,
			archived: true,
			modalState: false,
			modalStateDetail: false,
			modalStateAssign: false,
			selectedProject: null
		};
	}

	componentWillMount() {
		SocketProvider.on('NEW_PROJECT_CREATED', data => {
			let IDS = JSON.parse(data);
			let currentUSer = this.props.authStore?.user;
			if (JSON.parse(IDS)?.includes(currentUSer?._id)) {
				this.props.getProject(this.props.authStore?.user);
			}
		});
		if (this.props.authStore?.user) {
			this.props.getProject(this.props.authStore?.user);
		}
	}

	componentWillReceiveProps(newProps) {
		let preAction = getParameterByName('assign_project');
		let queryProjectId = getParameterByName('projectId');

		if (newProps.projectStores) {
			this.setState({
				projectLists: newProps.projectStores.allProjects
			});
			if (preAction && queryProjectId) {
				let projItem = newProps.projectStores?.allProjects?.filter(
					project => project._id === queryProjectId
				)[0];
				if (projItem) {
					this.getId(projItem);
					this.handleModalStateAssign(true);
				}
			}
		}
	}
	handleModalState = value => this.setState({ modalState: value });

	handleModalStateDetail = value => this.setState({ modalStateDetail: value });

	handleModalStateAssign = value => this.setState({ modalStateAssign: value });

	handleClick(projectId) {
		const archived = this.props.archivedProject(projectId, {
			archived: this.state.archived
		});
	}
	getId(project) {
		// this.props.getParamsUser(userid);

		this.setState({
			selectedProject: project
		});
	}

	render() {
		const { projectLists } = this.state;
		const visible = this.props.visible;
		const setVisible = this.props.setVisible;

		return (
			<>
				<div className="d-grid gap-2 d-md-flex justify-content-md-end"></div>
				&ensp;
				<CTable align="middle" className="mb-0 border" hover responsive>
					<CTableHead>
						<CTableRow>
							<CTableHeaderCell scope="col">Project Name</CTableHeaderCell>
							<CTableHeaderCell scope="col">Date_Debut</CTableHeaderCell>
							<CTableHeaderCell scope="col">Date_Fin</CTableHeaderCell>
							<CTableHeaderCell scope="col">Stack</CTableHeaderCell>
							<CTableHeaderCell scope="col">Nombre_employee</CTableHeaderCell>
							<CTableHeaderCell scope="col">Budget Project</CTableHeaderCell>
							<CTableHeaderCell scope="col">Status</CTableHeaderCell>

							<CTableHeaderCell scope="col">Actions</CTableHeaderCell>
						</CTableRow>
					</CTableHead>
					<CTableBody>
						{projectLists &&
							projectLists.map(item => {
								return (
									<CTableRow>
										<CTableDataCell>{item.name}</CTableDataCell>
										<CTableDataCell>{item.date_Debut}</CTableDataCell>
										<CTableDataCell>{item.date_Fin}</CTableDataCell>
										<CTableDataCell>{item.stack}</CTableDataCell>
										<CTableDataCell>{item.Nombre_employee}</CTableDataCell>
										<CTableDataCell>{item.budget}</CTableDataCell>
										<CTableDataCell>
											{' '}
											{item?.statut === 'ready' ? (
												<Chip label={item?.statut} style={{ width: '100px' }} color="info" />
											) : item?.statut === 'finished' ? (
												<>
													<Chip
														label={item?.statut}
														style={{ width: '100px' }}
														color="success"
													/>
													<Button
														onClick={() => {
															this.getId(item);
															this.handleModalStateEvaluate(true);
														}}
														color="secondary"
													>
														{' '}
														Evaluate
													</Button>
												</>
											) : (
												<Chip label={item?.statut} style={{ width: '100px' }} color="warning" />
											)}
										</CTableDataCell>
										<CTableDataCell>
											<PopupState variant="popover" popupId="demo-popup-menu">
												{popupState => (
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
																	popupState.close();
																}}
															>
																Info
															</MenuItem>

															<MenuItem
																onClick={() => {
																	this.getId(item);

																	this.handleModalStateAssign(true);
																	popupState.close();
																}}
															>
																Assign
															</MenuItem>
														</Menu>
													</>
												)}
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
						<CIcon icon={cilLibraryAdd} size="lg" />
						<CModalTitle>update Project</CModalTitle>
					</CModalHeader>
					<CModalBody>
						{' '}
						<UpdateProject
							ProjectToUpdate={this.state.selectedProject}
							closeModale={() => this.handleModalState(false)}
							closeCurrentModal={setVisible}
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
						<CModalTitle>Details Project</CModalTitle>
					</CModalHeader>
					<CModalBody>
						{' '}
						<DetailsProject ProjectDetails={this.state.selectedProject} />{' '}
					</CModalBody>
				</CModal>
				<CModal
					style={{
						backgroundColor: '#0094ff',
						color: 'white',
						width: '600px',
						width: ' 50em'
					}}
					alignment="center"
					className="modal_assign"
					visible={this.state.modalStateAssign}
					onClose={() => this.handleModalStateAssign()}
				>
					<CModalHeader
						style={{ backgroundColor: '#0094ff', color: 'white' }}
						onClose={() => this.handleModalStateAssign()}
					>
						<CModalTitle>Assign Project</CModalTitle>
					</CModalHeader>
					<CModalBody className="modal_body_assign" alignment="center">
						<AssignProject ProjectAssign={this.state.selectedProject} />{' '}
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
ListProjectUser.propTypes = {
	authStore: PropTypes.object.isRequired,
	currentUser: PropTypes.object.isRequired,
	getProject: PropTypes.func.isRequired,
	archivedProject: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	projectStores: state.projects,
	authStore: state.auth,
	currentUser: state.auth.user
});

export default connect(mapStateToProps, { getProject, archivedProject })(withMyHook(ListProjectUser));
