import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useDispatch } from 'react-redux';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CustomizedSnackbars({ sharedStore }) {
	const [open, setOpen] = React.useState(false);
	const dispatch = useDispatch();
	const handleClick = () => {
		setOpen({
			state: true,
			message: 'Project has been added...',
			stackType: 'error'
		});
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};
	React.useEffect(() => {
		if (sharedStore?.stackBarOptions?.state) {
			setOpen(sharedStore?.stackBarOptions);
			setTimeout(() => {
				dispatch({ type: 'SNACKBAR_HIDE' });
			}, 3010);
		}
	}, [sharedStore]);

	return (
		<Stack spacing={3} sx={{ width: '100%' }}>
			<Snackbar open={open.state} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={open?.stackType} sx={{ width: '100%' }}>
					{open?.message}
				</Alert>
			</Snackbar>
		</Stack>
	);
}

CustomizedSnackbars.propTypes = {
	sharedStore: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	sharedStore: state.shared
});

export default connect(mapStateToProps, {})(CustomizedSnackbars);
