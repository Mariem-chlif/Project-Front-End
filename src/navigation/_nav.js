import React from 'react';
import CIcon from '@coreui/icons-react';

import { cilSpeedometer, cilCalendar, cilGroup, cibNintendoGamecube } from '@coreui/icons';
import { CNavGroup, CNavItem } from '@coreui/react';

const _nav = [
	{
		style: {
			fontSize: '18px',
			fontFamily: 'Times New Roman',
			color: 'black',
			marginTop: '43px'
		},
		component: CNavItem,
		name: 'Dashboard',
		to: '/super-admin/dashboard',
		icon: <CIcon style={{ color: 'black' }} icon={cilSpeedometer} customClassName="nav-icon" />,
		access: ['superAdmin']
	},
	{
		style: {
			fontSize: '18px',
			fontFamily: 'Times New Roman',
			color: 'black'
		},
		component: CNavItem,
		name: 'calendar',
		to: '/super-admin/calendar',
		icon: <CIcon style={{ color: 'black' }} icon={cilCalendar} customClassName="nav-icon" />,
		access: ['superAdmin']
	},
	{
		style: {
			fontSize: '18px',
			fontFamily: 'Times New Roman',
			color: 'black'
		},
		component: CNavItem,
		name: 'calendarAdmin',
		to: '/calendar',
		icon: <CIcon style={{ color: 'black' }} icon={cilCalendar} customClassName="nav-icon" />,
		access: ['admin']
	},

	{
		style: { fontSize: '18px', fontFamily: 'Times New Roman', color: 'black' },
		component: CNavItem,
		name: 'List of Admins',
		to: '/List-admins',
		icon: <CIcon style={{ color: 'black' }} icon={cilGroup} customClassName="nav-icon" />,
		access: ['superAdmin']
	},
	{
		style: { fontSize: '18px', fontFamily: 'Times New Roman', color: 'black' },
		component: CNavItem,
		name: 'List of Employees',
		to: '/list-users',
		icon: <CIcon style={{ color: 'black' }} icon={cilGroup} customClassName="nav-icon" />,
		access: ['admin', 'superAdmin']
	},

	{
		style: {
			fontSize: '18px',
			fontFamily: 'Times New Roman',
			color: 'black'
		},
		component: CNavItem,
		name: 'List Project',
		to: '/ListProjectUser',
		icon: <CIcon style={{ color: 'black' }} icon={cibNintendoGamecube} customClassName="nav-icon" />,
		access: ['admin']
	},
	{
		style: { fontSize: '18px', fontFamily: 'Times New Roman', color: 'black' },
		component: CNavItem,
		name: 'List of Project',
		to: '/list-projects',
		icon: <CIcon style={{ color: 'black' }} icon={cibNintendoGamecube} customClassName="nav-icon" />,
		access: ['superAdmin']
	},

	{
		style: {
			fontSize: '18px',
			fontFamily: 'Times New Roman',
			color: 'black',
			marginTop: '48px'
		},
		component: CNavItem,
		name: 'User Dashboard',
		to: '/user/dashboard',
		icon: <CIcon style={{ color: 'black' }} icon={cilSpeedometer} customClassName="nav-icon" />,
		access: ['user']
	},
	{
		style: {
			fontSize: '18px',
			fontFamily: 'Times New Roman',
			color: 'black'
		},
		component: CNavItem,
		name: 'Calendar',
		to: '/user/calenderUser',
		icon: <CIcon style={{ color: 'black' }} icon={cilCalendar} customClassName="nav-icon" />,
		access: ['user']
	},
	{
		style: {
			fontSize: '18px',
			fontFamily: 'Times New Roman',
			color: 'black'
		},
		component: CNavItem,
		name: 'Current Projects',
		to: '/current/list-projects',
		icon: <CIcon style={{ color: 'black' }} icon={cibNintendoGamecube} customClassName="nav-icon" />,
		access: ['user']
	},
	{
		style: {
			fontSize: '18px',
			fontFamily: 'Times New Roman',
			color: 'black'
		},
		component: CNavItem,
		name: 'List of sprint',
		to: '/sprint/list-sprint',
		icon: <CIcon style={{ color: 'black' }} icon={cibNintendoGamecube} customClassName="nav-icon" />,
		access: ['user']
	},
	{
		style: {
			fontSize: '18px',
			fontFamily: 'Times New Roman',
			color: 'black'
		},
		component: CNavItem,
		name: 'List of Developpers',
		to: '/list-developpers',
		icon: <CIcon style={{ color: 'black' }} icon={cilGroup} customClassName="nav-icon" />,
		access: ['user']
	}
];

export default _nav;
