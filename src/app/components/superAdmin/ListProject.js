import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { getProject, deleteProject } from '../../../redux/actions/projectsActions';
import { archivedProject } from '../../../redux/actions/projectsActions';
import AddIcon from '@mui/icons-material/Add';
import CIcon from '@coreui/icons-react';
import PropTypes from 'prop-types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../file.css';
import './calendar.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
import './listProjectStyle.scss';
import UpdateProject from 'src/app/containers/superAdmin/UpdateProject';
import DetailsProject from 'src/app/containers/superAdmin/DetailsProject';
import DeleteProject from 'src/app/containers/superAdmin/DeleteProject';

import GenericFilter from '../GenericFilter';
import EvaluateProject from 'src/app/containers/superAdmin/EvaluateProject';
import SocketProvider from 'src/helpers/socket';

export class ListProject extends Component {
	constructor() {
		super();
		this.state = {
			projectLists: null,
			archived: true,
			modalState: false,
			sourceProjectList: null,
			ProjectArchivedDisplayed: false,
			modalStatedetail: false,
			modalStateDelete: false,
			modalStateEvaluate: false,
			modalStateassign: false,
			selectedProject: null
		};
	}

	componentWillMount() {
		this.props.getProject(null, { archived: 'false' });
	}

	componentWillReceiveProps(newProps) {
		if (newProps.projectStores) {
			this.setState({
				projectLists: newProps.projectStores.allProjects,
				sourceProjectList: newProps.projectStores.allProjects
			});
		}
	}
	handleModalState = value => this.setState({ modalState: value });
	changeListState = () =>
		this.setState({
			ProjectArchivedDisplayed: !this.state.ProjectArchivedDisplayed
		});

	handleModalStatedetail = value => this.setState({ modalStatedetail: value });

	handleModalStatedelete = value => this.setState({ modalStateDelete: value });

	handleModalStateEvaluate = value => this.setState({ modalStateEvaluate: value });

	handleModalStateassign = value => this.setState({ modalStateassign: value });

	handleClick(projectId) {
		const archived = this.props.archivedProject(projectId, {
			archived: this.state.archived
		});
	}
	getId(project) {
		this.setState({
			selectedProject: project
		});
	}
	handleListProjectChange = data => {
		this.setState({ projectLists: data });
	};

	render() {
		const { projectLists } = this.state;
		const visible = this.props.visible;
		const setVisible = this.props.setVisible;

		return (
			<>
				<div className="btn_actions_calendar top_header_admin_list">
					<span> {this.state?.ProjectArchivedDisplayed ? 'Archived List ' : 'Project list'}</span>
					<CButton color="light" variant="outline" onClick={() => setVisible(!visible)}>
						{' '}
						<AddIcon />
						Add Project
					</CButton>
				</div>
				&ensp;
				<CModal
					className="modal_list_project"
					style={{ backgroundColor: '#0094ff' }}
					alignment="center"
					visible={visible}
					onClose={() => setVisible(false)}
				>
					<CModalHeader
						style={{ backgroundColor: '#0094ff', color: 'white' }}
						onClose={() => setVisible(false)}
					>
						<CModalTitle>Add Project</CModalTitle>
					</CModalHeader>
					<CModalBody>
						{' '}
						<AddProject closeCurrentModal={setVisible} />{' '}
					</CModalBody>
				</CModal>
				<div className="fileter_admin_checkbox">
					<GenericFilter
						handleChange={this.handleListProjectChange}
						options={this.state.sourceProjectList}
						span="project"
						selector="name"
					/>

					<FormControlLabel
						onChange={e => {
							this.changeListState();
							if (e.target.checked) this.props.getProject(null, { archived: 'true' });
							else this.props.getProject(null, { archived: 'false' });
						}}
						control={<Checkbox />}
						label={'show archived projects'}
					/>
				</div>
				<CTable align="middle" className="mb-0 border" hover responsive>
					<CTableHead>
						<CTableRow>
							<CTableHeaderCell scope="col">Project Name</CTableHeaderCell>
							<CTableHeaderCell scope="col">Start_Date</CTableHeaderCell>
							<CTableHeaderCell scope="col">End_date</CTableHeaderCell>
							<CTableHeaderCell scope="col">Stack</CTableHeaderCell>

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

										<CTableDataCell>{item.budget}</CTableDataCell>
										<CTableDataCell>
											{item?.statut === 'ready' ? (
												<Chip label={item?.statut} style={{ width: '100px' }} color="info" />
											) : item?.statut === 'finished' && !item?.teamEvaluations ? (
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
						<CModalTitle>Update Project</CModalTitle>
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
					visible={this.state.modalStatedetail}
					onClose={() => this.handleModalStatedetail()}
				>
					<CModalHeader
						style={{ backgroundColor: '#0094ff', color: 'white' }}
						onClose={() => this.handleModalStatedetail()}
					>
						<CModalTitle>Details Project</CModalTitle>
					</CModalHeader>
					<CModalBody>
						{' '}
						<DetailsProject ProjectDetails={this.state.selectedProject} />{' '}
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
						<DeleteProject ProjectDelete={this.state.selectedProject} />
					</CModalBody>
				</CModal>
				<CModal
					style={{ backgroundColor: '#0094ff', color: 'white' }}
					alignment="center"
					className="modal-evaluate-user"
					visible={this.state.modalStateEvaluate}
					onClose={() => this.handleModalStateEvaluate()}
				>
					<CModalHeader onClose={() => this.handleModalStateEvaluate()}>
						<CModalTitle> Evaluate users</CModalTitle>
					</CModalHeader>
					<CModalBody>
						<EvaluateProject
							closeModal={this.handleModalStateEvaluate}
							refreshList={() => this.props.getProject(null, { archived: 'false' })}
							EvaluateProject={this.state.selectedProject}
						/>{' '}
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
ListProject.propTypes = {
	getProject: PropTypes.func.isRequired,
	archivedProject: PropTypes.func.isRequired,
	deleteProject: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	projectStores: state.projects,
	currentUser: state.auth.user
});

export default connect(mapStateToProps, {
	getProject,
	archivedProject,
	deleteProject
})(withMyHook(ListProject));
