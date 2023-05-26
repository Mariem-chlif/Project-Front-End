import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import './evaluate.scss';
import { CButton, CModalFooter } from '@coreui/react';
import { updateUser } from 'src/redux/actions/usersActions';
function EvaluateProject(props) {
	const { updateUser } = props;
	const [LocalData, setLocalData] = useState();
	const onChange = (e, user) => {
		console.log({
			...LocalData,
			[user]: {
				...LocalData?.[user],
				[e.target.name]: e.target.value
			}
		});
		setLocalData({
			...LocalData,
			[user]: {
				...LocalData?.[user],
				[e.target.name]: e.target.value
			}
		});
	};
	const submit = e => {
		e.preventDefault();
		console.log(LocalData);
		Object.keys(LocalData).map(user => {
			updateUser(
				user,
				{
					evaluation: LocalData[user]
				},
				props.closeModal
			);
		});

		props.refreshList();
	};
	return (
		<div className="evaluate_modal_form_list">
			<form onSubmit={submit}>
				<TableContainer component={Paper}>
					<TableContainer sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell align="center">discipline</TableCell>
								<TableCell align="center">technique</TableCell>
								<TableCell align="center">challenge</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{props.EvaluateProject?.assignedUsers?.map(({ _id, avatar, name, competence }) => {
								return (
									<TableRow key={name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell component="th" scope="row">
											{name}
										</TableCell>
										<TableCell align="right">
											<TextField
												onChange={e => onChange(e, _id)}
												name="discipline"
												className="input_evaluate"
												type="number"
												inputProps={{ min: 0 }}
												defaultValue={0}
												placeholder="note..."
												variant="outlined"
												fullWidth
											/>
										</TableCell>
										<TableCell align="right">
											<TextField
												onChange={e => onChange(e, _id)}
												name="technique"
												className="input_evaluate"
												type="number"
												inputProps={{ min: 0 }}
												defaultValue={0}
												placeholder="note..."
												variant="outlined"
												fullWidth
											/>
										</TableCell>
										<TableCell align="right">
											<TextField
												onChange={e => onChange(e, _id)}
												name="challenge"
												className="input_evaluate"
												type="number"
												inputProps={{ min: 0 }}
												defaultValue={0}
												placeholder="note..."
												variant="outlined"
												fullWidth
											/>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</TableContainer>
				</TableContainer>

				<CModalFooter className="btn_actions_calendar modal_action">
					<CButton type="submit" variant="outline" color="light" shape="rounded-15">
						Confirm
					</CButton>
				</CModalFooter>
			</form>
		</div>
	);
}

EvaluateProject.propTypes = {
	addUser: PropTypes.func.isRequired,
	updateUser: PropTypes.func.isRequired,
	authStore: PropTypes.object.isRequired,
	assignUsersToProject: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	usersStores: state.users,
	authStore: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, { updateUser })(withRouter(EvaluateProject));
