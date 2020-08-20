import { connect } from 'react-redux';

import { loginUser } from '../../../redux/AuthReducer';

import Login from './Login';

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  logUser: ({ email, password }) => dispatch(loginUser({ email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
