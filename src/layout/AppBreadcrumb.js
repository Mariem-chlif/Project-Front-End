import { React, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CBreadcrumb, CButton } from "@coreui/react";

class AppBreadcrumb extends Component {
  render() {
    return <CBreadcrumb className="m-0 ms-2"></CBreadcrumb>;
  }
}

AppBreadcrumb.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AppBreadcrumb);
