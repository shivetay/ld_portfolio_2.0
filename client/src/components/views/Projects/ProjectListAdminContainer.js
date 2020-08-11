import { connect } from 'react-redux';

import { logoutUser } from '../../../redux/AuthReducer';
import { deleteProject, getAllProjects } from '../../../redux/ProjectReducer';

import ProjectListAdmin from './ProjectListAdmin';

const mapStateToProps = (state) => ({
  auth: state.auth,
  projects: state.project.projects,
  loading: state.project.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getProj: (page) => dispatch(getAllProjects(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListAdmin);
