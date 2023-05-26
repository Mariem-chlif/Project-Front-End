import { React, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProject } from "../../../redux/actions/projectsActions";
import { archivedProject } from "../../../redux/actions/projectsActions";
import { withRouter } from "react-router-dom";
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTableHeaderCell,
} from "@coreui/react";
class DetailsProject extends Component {
  constructor() {
    super();
    this.state = {
      Project: null,

      errors: {},
    };
  }

  render() {
    const { errors } = this.state;
    const { Project } = this.state;

    return (
      <>
        <div>
          <div>
            <label>Project details</label>
            <ul class="list-unstyled">
              <li>Project Title : {this.props.ProjectDetails?.name}</li>
              <li>Stack of project :{this.props.ProjectDetails?.stack}</li>
              <li>
                Front end technology : {this.props.ProjectDetails?.frontEnd}
              </li>

              <li>
                Back end technology : {this.props.ProjectDetails?.backEnd}
              </li>
              <li>Start date : {this.props.ProjectDetails?.date_Debut}</li>
              <li>End date : {this.props.ProjectDetails?.date_Fin}</li>
              <li>
                Nomber of employees :{" "}
                {this.props.ProjectDetails?.Nombre_employee}
              </li>
              <li>Description : {this.props.ProjectDetails?.description}</li>
            </ul>
          </div>
        </div>
        <div>
          <label>Users details</label>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Cost</CTableHeaderCell>
                <CTableHeaderCell scope="col">Position</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {this.props.ProjectDetails?.assignedUsers?.map(
                ({ cout, name, position }) => (
                  <CTableRow>
                    <CTableHeaderCell scope="row">{name}</CTableHeaderCell>
                    <CTableHeaderCell scope="col">{cout}</CTableHeaderCell>
                    <CTableHeaderCell scope="col">{position}</CTableHeaderCell>
                  </CTableRow>
                )
              )}
            </CTableBody>
          </CTable>
        </div>
      </>
    );
  }
}
DetailsProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  archivedProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { getProject, archivedProject })(
  withRouter(DetailsProject)
);
