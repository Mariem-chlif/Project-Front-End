import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CBadge, CImage } from '@coreui/react';

export const AppSidebarNav = (props, { items }) => {
	const { currentUser } = props;
	const location = useLocation();

	const navLink = (name, icon, badge) => {
		return (
			<>
				{icon && icon}
				{name && name}
				{badge && (
					<CBadge color={badge.color} className="ms-auto">
						{badge.text}
					</CBadge>
				)}
			</>
		);
	};

	const navItem = (item, index) => {
		const { component, name, badge, icon, ...rest } = item;
		const Component = component;
		return (
			<Component
				{...(rest.to &&
					!rest.items && {
						component: NavLink
					})}
				key={index}
				{...rest}
			>
				{navLink(name, icon, badge)}
			</Component>
		);
	};
	const navGroup = (item, index) => {
		const { component, name, icon, to, ...rest } = item;
		const Component = component;
		return (
			<Component
				idx={String(index)}
				key={index}
				toggler={navLink(name, icon)}
				visible={location.pathname.startsWith(to)}
				{...rest}
			>
				{item.items?.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
			</Component>
		);
	};

	return (
		<React.Fragment>
			{props.items &&
				props.items.map((item, index) => {
					return item.access.includes(currentUser.role)
						? item.items
							? navGroup(item, index)
							: navItem(item, index)
						: null;
				})}
		</React.Fragment>
	);
};

AppSidebarNav.propTypes = {
	items: PropTypes.arrayOf(PropTypes.any).isRequired
};
