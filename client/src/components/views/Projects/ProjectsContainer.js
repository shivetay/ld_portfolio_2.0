import { connect } from 'react-redux';

import { deleteProject, getAllProjects } from '../../../redux/ProjectReducer';

import Projects from './Projects';

const mapStateToProps = (state) => ({
  projects: state.project.projects,
  loading: state.project.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getProj: (page) => dispatch(getAllProjects(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
