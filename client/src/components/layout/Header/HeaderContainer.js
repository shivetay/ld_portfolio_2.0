import { connect } from 'react-redux';

import { outUser } from '../../../redux/AuthReducer';

import Header from './Header';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(outUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
