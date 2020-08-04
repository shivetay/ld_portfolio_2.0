import { connect } from 'react-redux';

import AdminRoute from './AdminRoute';

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(AdminRoute);
