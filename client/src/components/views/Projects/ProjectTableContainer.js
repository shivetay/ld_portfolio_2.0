import { connect } from 'react-redux';
import { deleteProject, getAllProjects } from '../../../redux/ProjectReducer';

import ProjectTable from './ProjectTable';

const mapStateToProps = (state) => ({
  projects: state.project.projects,
});

const mapDispatchToProps = (dispatch) => ({
  delProject: (id) => dispatch(deleteProject(id)),
  getProj: (page) => dispatch(getAllProjects(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTable);
