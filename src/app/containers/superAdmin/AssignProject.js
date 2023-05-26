import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';

import Checkbox from '@mui/material/Checkbox';

import { React, Component, useState } from 'react';

import '../../components/file.css';
import Button from '@mui/material/Button';
import { getUsersActive } from 'src/redux/actions/usersActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { assignUsersToProject } from 'src/redux/actions/projectsActions';
import Grid from '@mui/material/Grid';
import ListItemIcon from '@mui/material/ListItemIcon';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';

function not(a, b) {
	return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
	return a.filter(value => b.indexOf(value) !== -1);
}

class AssignProject extends Component {
	constructor() {
		super();
		this.state = {
			UserLists: null,
			sourceUserList: null,
			errors: {},
			selectedProjectToAssign: null,
			listAssignedUsers: [],
			newBudget: null
		};
	}

	componentWillMount() {
		if (this.props.authStore?.user) {
			this.props.getUsersActive(this.props.authStore?.user, {
				archived: 'false'
			});
		}
	}
	componentWillUpdate(prevProps, prevState) {
		if (
			this.state.selectedProjectToAssign?.budget &&
			prevState?.listAssignedUsers !== this.state.listAssignedUsers
		) {
			let budget = this.state.selectedProjectToAssign?.budget;
			prevState?.listAssignedUsers.map(item => item.cout && (budget = budget - item.cout));
			this.setState({ newBudget: budget });
		}
	}
	componentWillReceiveProps(newProps, nextProps) {
		if (newProps.ProjectAssign && newProps.usersStores) {
			let assignedUserPrice = 0;
			let listAssignedUsers = [];
			newProps.usersStores.allUsers.map(item => {
				if (item.currentAssignedProject === newProps.ProjectAssign?._id) {
					item.cout && (assignedUserPrice += item.cout);
					listAssignedUsers.push(item);
				}
			});
			this.setState({
				selectedProjectToAssign: newProps.ProjectAssign,
				newBudget: +newProps.ProjectAssign.budget - +assignedUserPrice,
				listAssignedUsers
			});

			if (newProps.usersStores) {
				this.setState({
					UserLists: newProps.usersStores.allUsers,
					sourceUserList: newProps.usersStores.allUsers
				});
			}
		}

		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	handleUserAssign = user => {
		let data = this.state.listAssignedUsers;
		if (data.includes(user)) {
			data = data.filter(item => item !== user);
		} else data = [...data, user];
		data && this.setState({ listAssignedUsers: data });
	};
	submitAssignProject = listUsersToAssign => {
		this.props.assignUsersToProject(
			this.state.selectedProjectToAssign._id,
			[...listUsersToAssign].map(item => item._id)
		);
	};
	handleBudgetChange = selectedUsers => {
		this.setState({
			selectedProjectToAssign: {
				...this.state.selectedProjectToAssign,
				budget: this.state.selectedProjectToAssign.budget - selectedUsers.cout
			}
		});
	};

	render() {
		const { errors } = this.state;
		const { UserLists } = this.state;

		return (
			<div className="assign_list_items">
				<div className={`newBudget_item ${this.state.newBudget < 0 && ' danger_budget'}`}>
					Project budget: {this.state.newBudget}${' '}
				</div>
				{UserLists && (
					<UsersToAssignList
						UserLists={UserLists}
						newBudget={this.state.newBudget}
						handleUserAssign={this.handleUserAssign}
						submitAssignProject={this.submitAssignProject}
						selectedProject={this.state.selectedProjectToAssign}
					/>
				)}
			</div>
		);
	}
}

const UsersToAssignList = props => {
	const { UserLists, submitAssignProject, selectedProject, handleUserAssign, newBudget } = props;
	const [checked, setChecked] = useState([]);
	const [left, setLeft] = useState(
		[...UserLists?.filter(item => !item.currentAssignedProject)].sort((a, b) => b.score - a.score)
	);
	const [right, setRight] = useState(UserLists?.filter(item => item.currentAssignedProject === selectedProject?._id));

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);
	const [selectedBudget, setSelectedBudget] = useState(0);

	useEffect(() => {
		if (leftChecked?.length > 0) {
			let variableBudget = 0;
			leftChecked?.map(item => (variableBudget = variableBudget + item.cout));

			setSelectedBudget(variableBudget);
		}
	}, [leftChecked]);

	const handleToggle = value => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}
		setChecked(newChecked);
	};

	const handleAllRight = () => {
		setRight(right.concat(left));
		setLeft([]);
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};

	const handleAllLeft = () => {
		setLeft(left.concat(right));
		setRight([]);
	};

	const customList = items => (
		<Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
			<List dense component="div" role="list">
				{items.map((value, index) => {
					const labelId = `transfer-list-item-${value}-label`;
					return (
						<ListItem key={value + index} role="listitem" button onClick={handleToggle(value)}>
							<ListItemIcon>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									onChange={e => handleUserAssign(value)}
									inputProps={{
										'aria-labelledby': labelId
									}}
								/>
							</ListItemIcon>
							<ListItemText
								id={labelId}
								primary={`${value?.name}  ${value?.cout} $  Score : ${value?.score} *`}
							/>
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</Paper>
	);

	return (
		<div className="assign_list_grid">
			<Grid container spacing={2} justifyContent="center" alignItems="center">
				<Grid item>{customList(left)}</Grid>
				<Grid item>
					<Grid container direction="column" alignItems="center">
						<Button
							sx={{ my: 0.5 }}
							variant="outlined"
							size="small"
							onClick={handleAllRight}
							disabled={left.length === 0 || newBudget < 0}
							aria-label="move all right"
						>
							≫
						</Button>
						<Button
							sx={{ my: 0.5 }}
							variant="outlined"
							size="small"
							onClick={handleCheckedRight}
							disabled={leftChecked.length === 0 || newBudget < 0}
							aria-label="move selected right"
						>
							&gt;
						</Button>
						<Button
							sx={{ my: 0.5 }}
							variant="outlined"
							size="small"
							onClick={handleCheckedLeft}
							disabled={rightChecked.length === 0}
							aria-label="move selected left"
						>
							&lt;
						</Button>
						<Button
							sx={{ my: 0.5 }}
							variant="outlined"
							size="small"
							onClick={handleAllLeft}
							disabled={right.length === 0}
							aria-label="move all left"
						>
							≪
						</Button>
					</Grid>
				</Grid>
				<Grid item>{customList(right)}</Grid>
			</Grid>
			<Button className="btn_submit_assignment" onClick={() => submitAssignProject(right)}>
				confirm assignment
			</Button>
		</div>
	);
};
AssignProject.propTypes = {
	authStore: PropTypes.object.isRequired,
	assignUsersToProject: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	usersStores: state.users,
	authStore: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, {
	getUsersActive,
	assignUsersToProject
})(withRouter(AssignProject));
