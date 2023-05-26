import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllNotifications } from 'src/redux/actions/notification.action';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import Alert from '@mui/material/Alert';

import './notification.scss';
import { withRouter } from 'react-router';
import SocketProvider from 'src/helpers/socket';
const NotificationsComponent = props => {
	const { getAllNotifications, currentUser, history, notificationsStore } = props;
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};
	React.useEffect(() => {
		getAllNotifications(currentUser?._id);
		SocketProvider.on('NOTIFICATION_PROJECT_ADMIN', data => {
			let IDS = JSON.parse(data);
			if (IDS?.includes(currentUser?._id)) {
				getAllNotifications(currentUser?._id);
			}
		});
	}, []);
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<React.Fragment>
			<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
				<Tooltip title="Account settings">
					<IconButton
						onClick={handleClick}
						size="small"
						sx={{ ml: 2 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup="true"
						color="info"
						disabled={
							notificationsStore?.allNotifications?.length === 0 || !notificationsStore?.allNotifications
						}
						aria-expanded={open ? 'true' : undefined}
						aria-label={notificationsLabel(notificationsStore?.allNotifications?.length)}
					>
						<Badge badgeContent={notificationsStore?.allNotifications?.length} color="error">
							<NotificationsActiveIcon />
						</Badge>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0
						}
					}
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<List
					className="notification_list"
					sx={{
						width: '100%',
						maxWidth: 560,
						maxHeight: 360,
						overflowY: 'auto',
						bgcolor: 'background.paper'
					}}
				>
					{notificationsStore?.allNotifications?.map((notification, index) => (
						<div>
							<ListItem key={index} alignItems="flex-start">
								<ListItemAvatar>
									<Avatar
										alt="Remy Sharp"
										src={'http://localhost:5000/' + notification?.sender?.avatar}
									/>
								</ListItemAvatar>

								<Alert severity={notification?.type}>
									<ListItemText
										primary={notification?.title}
										onClick={() => {
											notification?.body?.page && history.push(notification?.body?.page);
											handleClose();
										}}
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: 'inline' }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													{currentUser?.name} -{' '}
												</Typography>
												{notification?.body?.message}
											</React.Fragment>
										}
									/>
								</Alert>
							</ListItem>
							<Divider variant="inset" component="li" />
						</div>
					))}
				</List>
			</Menu>
		</React.Fragment>
	);
};
function notificationsLabel(count) {
	if (count === 0) {
		return 'no notifications';
	}
	if (count > 99) {
		return 'more than 99 notifications';
	}
	return `${count} notifications`;
}
NotificationsComponent.propTypes = {
	getAllNotifications: PropTypes.func.isRequired,
	notificationsStore: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	currentUser: state.auth.user,
	notificationsStore: state.notifications
});

const mapDispatchToProps = { getAllNotifications };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotificationsComponent));
