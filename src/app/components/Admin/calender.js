import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { getProject } from 'src/redux/actions/projectsActions';
import { getUsersActive, getParamsUser } from 'src/redux/actions/usersActions';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import React, { Component, useState } from 'react';
import moment from 'moment';
import './calendar.css';
import ProjectDetailsModal from '../superAdmin/ProjectDetailsModal';
import { CButton, CFormSelect } from '@coreui/react';

const locales = {
	'en-US': require('date-fns/locale/en-US')
};
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales
});

export class calender extends Component {
	constructor() {
		super();

		this.state = {
			modalStates: { open: false, object: null },
			calendarEvents: [],
			selectedEvents: null,
			projectLists: null,
			userLists: null,
			projectListsWeb: null,
			projectListMobile: null,
			userLists: null,

			modalStates: false,
			allAdmins: null
		};
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount(userid) {
		this.props.getParamsUser(userid);
		if (this.props.authStore?.user) {
			this.props.getProject(this.props.authStore?.user);
		}
		if (this.props.authStore?.user) {
			this.props.getUsersActive(this.props.authStore?.user);
		}
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	componentWillReceiveProps(newProps, nextProps) {
		if (newProps.projectStores.allProjects) {
			let projectListCalendar = [];
			Promise.all(
				newProps?.projectStores?.allProjects?.map(item =>
					projectListCalendar.push({
						item,
						title: item?.name,
						start: moment(item?.date_Debut).format('YYYY-MM-DD'),
						end: moment(item?.date_Fin).format('YYYY-MM-DD')
					})
				)
			).then(() => {
				this.setState({
					calendarEvents: [...this.state.calendarEvents, ...projectListCalendar]
				});
			});
		}

		if (newProps.authStore) {
			this.setState({ allUsers: newProps.usersStores.allUsers });
		}

		if (newProps.usersStores.allUsers) {
			let userLists = [];
			Promise.all(
				newProps.usersStores.allUsers.map(item => {
					item.project?.map(proj =>
						userLists.push({
							title: item?.name,
							start: moment(proj?.date_Debut).format('YYYY-MM-DD'),
							end: moment(proj?.date_Fin).format('YYYY-MM-DD')
						})
					);
				})
			).then(() => this.setState({ userLists }));
		}

		if (newProps.usersStores) {
			this.setState({
				userLists: newProps.usersStores.allUsers
			});
		}
	}

	addUserToCalender() {
		this.setState({ calendarEvents: this.state.userLists });
	}

	setUserCalendarData = item => {
		let userLists = [];
		Promise.all(
			item.project?.map(proj =>
				userLists.push({
					title: proj?.name,
					start: moment(proj?.date_Debut).format('YYYY-MM-DD'),
					end: moment(proj?.date_Fin).format('YYYY-MM-DD')
				})
			)
		).then(() => this.setState({ calendarEvents: userLists }));
	};
	handleOpen = data => this.setState({ modalStates: data });
	handleClose = () => this.setState({ modalStates: { open: false, object: null } });

	render() {
		const { userLists, allAdmins } = this.state;

		return (
			<>
				<div className="row">
					<div className="col-md-4">
						<label>Liste of users :</label>
						<CFormSelect
							id="inputGroupSelect01"
							onChange={e =>
								this.setUserCalendarData([...userLists.filter(r => r.name === e.target.value)][0])
							}
						>
							{userLists &&
								userLists.map(item => {
									return <option>{item?.name}</option>;
								})}
						</CFormSelect>
					</div>
				</div>

				<ProjectDetailsModal {...this.state.modalStates} handleClose={this.handleClose} />
				<Calendar
					onSelectEvent={object => this.handleOpen({ open: true, object })}
					localizer={localizer}
					events={this.state.calendarEvents}
					startAccessor="start"
					endAccessor="end"
					style={{ hight: '100%' }}
				>
					{' '}
				</Calendar>
			</>
		);
	}
}

calender.propTypes = {
	getProject: PropTypes.func.isRequired,
	getUsersActive: PropTypes.func.isRequired,
	getParamsUser: PropTypes.func.isRequired,
	authStore: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	projectStores: state.projects,
	usersStores: state.users,
	authStore: state.auth
});

export default connect(mapStateToProps, {
	getProject,
	getUsersActive,
	getParamsUser
})(calender);
