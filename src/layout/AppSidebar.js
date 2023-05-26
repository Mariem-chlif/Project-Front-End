import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlanTeamsLogo from '../assets/images/Asset 2.png';
import { connect } from 'react-redux';
import '../scss/style.scss';

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler, CImage } from '@coreui/react';
//import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import Icon from './logo dark.svg';
// sidebar nav config
import navigation from '../navigation/_nav';

const AppSidebar = props => {
	const dispatch = useDispatch();
	const unfoldable = useSelector(state => state.sidebarUnfoldable);
	const sidebarShow = useSelector(state => state.sidebarShow);
	const { currentUser } = props;

	return (
		<CSidebar
			position="fixed"
			unfoldable={unfoldable}
			visible={sidebarShow}
			onVisibleChange={visible => {
				dispatch({ type: 'set', sidebarShow: visible });
			}}
		>
			<CSidebarBrand className="d-none d-md-flex " style={{ backgroundColor: '#ffffff' }} to="/">
				<div className="clearfix">
					<img src={Icon} width={142} />
				</div>
				&ensp;
			</CSidebarBrand>

			<CSidebarNav Z>
				<SimpleBar>
					<AppSidebarNav {...props} items={navigation} />
				</SimpleBar>
			</CSidebarNav>
			<CSidebarToggler
				className="d-none d-lg-flex"
				onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
			/>
		</CSidebar>
	);
};
const mapStateToProps = state => ({
	currentUser: state.auth.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppSidebar);
