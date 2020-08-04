import { connect } from 'react-redux';

// import { loginUser } from '../../../redux/AuthReducer';

import AdminDashboard from './AdminDashboard';

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(AdminDashboard);
