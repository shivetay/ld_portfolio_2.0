import { connect } from 'react-redux';

import Header from './Header';

const mapStateToProps = (state) => ({
  // isAuth: state.auth.isAuthenticated,
  // user: state.auth.user.role,
  auth: state.auth,
});

export default connect(mapStateToProps)(Header);
