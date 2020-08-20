import { connect } from 'react-redux';

import { getProject, getAllProjects } from '../../../redux/ProjectReducer';

import ProjectList from './ProjectList';

const mapStateToProps = (state) => ({
  project: state.project.project,
  projects: state.project.projects,
  loading: state.project.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getOneProj: (id) => dispatch(getProject(id)),
  getProj: (page) => dispatch(getAllProjects(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
