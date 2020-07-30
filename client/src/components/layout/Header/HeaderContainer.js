import { connect } from 'react-redux';

import Header from './Header';

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(Header);
