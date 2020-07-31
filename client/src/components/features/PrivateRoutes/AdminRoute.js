import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// import { isAuthUser } from '../../../utils/utils';

const AdminRoute = ({ component: Component, user, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      user.role === 2308 && isAuth ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/users/me', state: { from: props.location } }}
        />
      )
    }
  />
);

AdminRoute.propTypes = {
  isAuth: PropTypes.bool,
  user: PropTypes.object,
};

export default AdminRoute;
