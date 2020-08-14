import { connect } from 'react-redux';

import { getProject } from '../../../redux/ProjectReducer';

import Project from './Project';

const mapStateToProps = (state) => ({
  project: state.project.project,
  projects: state.project.projects,
  loading: state.project.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getOneProj: (id) => dispatch(getProject(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);
