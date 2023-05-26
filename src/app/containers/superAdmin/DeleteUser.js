import { React, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deleteUser } from "../../../redux/actions/usersActions";
import { withRouter } from "react-router-dom";
import "../../components/file.css";

import Button from "@mui/material/Button";

class DeleteUser extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  handleClick(UserId) {
    this.props.deleteUser(UserId, this.props.closeModal);
  }

  render() {
    return (
      <>
        <label>
          {" "}
          Do you really want to delete these User? this process cannot be undone{" "}
        </label>
        <Button onClick={this.props.closeModal}> Cancel</Button>
        <Button
          onClick={() => this.handleClick(this.props.UserDelete?._id)}
          color="error"
        >
          {" "}
          Delete
        </Button>
      </>
    );
  }
}
DeleteUser.propTypes = {
  deleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authStore: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { deleteUser })(withRouter(DeleteUser));
