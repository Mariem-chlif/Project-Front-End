import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { getProject } from 'src/redux/actions/projectsActions';

import { getProjectWeb, getProjectMobile } from '../../../redux/actions/projectsActions';
import { getUsers } from 'src/redux/actions/usersActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import React, { Component, useState } from 'react';
import moment from 'moment';
import './calenderUser.css';
import CIcon from '@coreui/icons-react';
import { CButton, CFormSelect } from '@coreui/react';
import { cibAddthis, cilLibraryAdd } from '@coreui/icons';
import AddProject from '../../containers/superAdmin/AddProject';
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

export class calenderUser extends Component {
	constructor() {
		super();

		this.state = {
			calendarEvents: [],
			selectedEvents: null,
			projectLists: null,
			projectListsWeb: null,
			projectListMobile: null,
			allProjects: null
		};
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount(userid) {
		this.props.getProjectWeb();
		this.props.getProject();
		this.props.getProjectMobile();
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	componentWillReceiveProps(newProps) {
		if (newProps.projectStores.allProjectsWeb) {
			let projectListsWeb;
			Promise.all(
				(projectListsWeb = newProps.projectStores.allProjectsWeb.map(item => {
					return {
						title: item?.name,
						start: moment(item?.date_Debut).format('YYYY-MM-DD'),
						end: moment(item?.date_Fin).format('YYYY-MM-DD')
					};
				}))
			).then(() => this.setState({ projectListsWeb }));
		}
		if (newProps.projectStores.allProjectsMobile) {
			let projectListMobile;
			Promise.all(
				(projectListMobile = newProps.projectStores.allProjectsMobile.map(item => {
					return {
						title: item?.name,
						start: moment(item?.date_Debut).format('YYYY-MM-DD'),
						end: moment(item?.date_Fin).format('YYYY-MM-DD')
					};
				}))
			).then(() => this.setState({ projectListMobile }));
		}
		if (newProps.projectStores) {
			this.setState({
				allProjects: newProps.projectStores.allProjects
			});
		}
	}

	addProjectToCalender() {
		this.setState({ calendarEvents: this.state.projectListsWeb });
	}
	addProjectMobileToCalender() {
		this.setState({ calendarEvents: this.state.projectListMobile });
	}
	setProjectCalendarData = item => {
		this.setState({
			calendarEvents: [
				{
					title: item?.name,
					start: moment(item?.date_Debut).format('YYYY-MM-DD'),
					end: moment(item?.date_Fin).format('YYYY-MM-DD')
				}
			]
		});
	};

	render() {
		const { allProjects } = this.state;
		return (
			<>
				<div className="row">
					<div className="col-md-4">
						<CFormSelect
							id="inputGroupSelect01"
							onChange={e =>
								this.setProjectCalendarData([...allProjects.filter(r => r.name === e.target.value)][0])
							}
						>
							{allProjects &&
								allProjects.map(item => {
									return <option>{item?.name}</option>;
								})}
						</CFormSelect>
					</div>
				</div>
				<CButton color="light" onClick={() => this.addProjectToCalender()}>
					All projects web
				</CButton>
				<CButton color="light" onClick={() => this.addProjectMobileToCalender()}>
					All projects Mobile
				</CButton>

				<Calendar
					localizer={localizer}
					events={this.state.calendarEvents}
					startAccessor="start"
					endAccessor="end"
				>
					{' '}
				</Calendar>
			</>
		);
	}
}

calenderUser.propTypes = {
	getProjectWeb: PropTypes.func.isRequired,
	getProjectMobile: PropTypes.func.isRequired,
	getProject: PropTypes.func.isRequired,
	getUsers: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	projectStores: state.projects,
	usersStores: state.users
});

export default connect(mapStateToProps, {
	getProjectWeb,
	getProject,
	getProjectMobile,
	getUsers
})(calenderUser);
