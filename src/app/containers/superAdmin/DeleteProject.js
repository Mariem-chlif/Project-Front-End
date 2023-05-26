import { React, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProject } from "../../../redux/actions/projectsActions";
import { deleteProject } from "../../../redux/actions/projectsActions";
import { withRouter } from "react-router-dom";
import "../../components/file.css";

import Button from "@mui/material/Button";

class DeleteProject extends Component {
  constructor() {
    super();
    this.state = {
      Project: null,

      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    this.props.getProject(null, { archived: "true" });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.auth) {
      this.setState({ Project: nextProps.auth.Project });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleClick(ProjectId) {
    this.setState({ errors: {} });
    this.props.deleteProject(ProjectId, this.props.closeModal);
  }

  render() {
    return (
      <>
        <label>
          {" "}
          Do you really want to delete these Project? this process cannot be
          undone{" "}
        </label>
        <Button onClick={this.props.closeModal}> Cancel</Button>
        <Button
          onClick={() => this.handleClick(this.props.ProjectDelete?._id)}
          color="error"
        >
          {" "}
          Delete
        </Button>
      </>
    );
  }
}
DeleteProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  authStore: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authStore: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { getProject, deleteProject })(
  withRouter(DeleteProject)
);
