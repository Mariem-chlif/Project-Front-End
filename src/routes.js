import React from 'react';
import './scss/style.scss';

const superAdminDashboard = React.lazy(() => import('./app/pages/superAdmin/superAdminDashboard'));
const AddAdmin = React.lazy(() => import('./app/containers/superAdmin/AddAdmin'));
const adminDashboard = React.lazy(() => import('./app/pages/Admin/adminDashboard'));
const ListAdmin = React.lazy(() => import('./app/components/superAdmin/ListAdmin'));
const addUser = React.lazy(() => import('./app/containers/Admin/addUser'));
const addProject = React.lazy(() => import('./app/containers/superAdmin/AddProject'));
const ListProject = React.lazy(() => import('./app/components/superAdmin/ListProject'));
const calendar = React.lazy(() => import('./app/components/superAdmin/calendar'));
const calender = React.lazy(() => import('./app/components/Admin/calender'));

const ListUser = React.lazy(() => import('./app/components/Admin/ListUser'));

const userDashboard = React.lazy(() => import('./app/pages/User/userDashboard'));
const calenderUser = React.lazy(() => import('./app/components/User/calenderUser'));
const ListProjectUser = React.lazy(() => import('./app/components/Admin/ListProjectUser'));
const Profile = React.lazy(() => import('./app/components/profile/Profile'));
const ListSprint = React.lazy(() => import('./app/components/User/ListSprint'));
const routes = [
	{
		path: '/super-admin/dashboard',
		name: 'SuperAdmin Dashboard',
		element: superAdminDashboard,
		access: ['superAdmin']
	},
	{
		path: '/super-admin/calendar',
		name: 'calendar',
		element: calendar,
		access: ['superAdmin']
	},
	{
		path: '/calendar',
		name: 'calendarAdmin',
		element: calender,
		access: ['admin']
	},
	{
		path: '/add-admin',
		name: 'Add Admin',
		element: AddAdmin,
		access: ['superAdmin']
	},
	{
		path: '/admin/dashboard',
		name: 'Admin Dashboard',
		element: adminDashboard,
		access: ['admin']
	},
	{
		path: '/add-user',
		name: 'Add user',
		element: addUser,
		access: ['admin']
	},
	{
		path: '/list-users',
		name: 'List of users',
		element: ListUser,
		access: ['admin', 'superAdmin'],
		exact: true
	},
	{
		path: '/ListProjectUser',
		name: 'List Project',
		element: ListProjectUser,
		access: ['admin']
	},

	{
		path: '/list-admins',
		name: 'List of  Admins',
		element: ListAdmin,
		access: ['superAdmin']
	},
	{
		path: '/list-projects',
		name: 'List of Project',
		element: ListProject,
		access: ['superAdmin']
	},
	{
		path: '/add-project',
		name: 'add project',
		element: addProject,
		access: ['superAdmin']
	},
	{
		path: '/user/dashboard',
		name: 'User Dashboard',
		element: userDashboard,
		access: ['user']
	},
	{
		path: '/user/calenderUser',
		name: 'Calendar ',
		element: calenderUser,
		access: ['user']
	},
	{
		path: '/user/calenderUser',
		name: 'Calendar ',
		element: calenderUser,
		access: ['user']
	},
	{
		path: '/sprint/list-sprint',
		name: 'List of sprint ',
		element: ListSprint,
		access: ['user']
	},
	{
		path: '/profile/:userId',
		name: 'Profile',
		element: Profile,
		access: ['superAdmin', 'admin', 'user']
	}
];
export default routes;
