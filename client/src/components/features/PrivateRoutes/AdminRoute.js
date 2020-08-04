import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const AdminRoute = ({ component: Component, user, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuth ? (
        <Redirect to='/login' />
      ) : !user.role === 2308 && isAuth ? (
        <Redirect
          to={{ pathname: '/users/me', state: { from: props.location } }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

AdminRoute.propTypes = {
  isAuth: PropTypes.bool,
  user: PropTypes.object,
};

export default AdminRoute;
