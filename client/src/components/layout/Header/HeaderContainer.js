import { connect } from 'react-redux';

import { logoutUser } from '../../../redux/AuthReducer';

import Header from './Header';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
