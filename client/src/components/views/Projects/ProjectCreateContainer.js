import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import {} from '../../../redux/AuthReducer';
import { createNewProject } from '../../../redux/ProjectReducer';

import ProjectCreate from './ProjectCreate';

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
  newProject: state.project.project,
  loading: state.project.loading,
});

const mapDispatchToProps = (dispatch) => ({
  newProject: (formData, history, userId) =>
    dispatch(createNewProject(formData, history, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProjectCreate));
