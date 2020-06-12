import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthUser } from '../../../utils/utils';

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthUser() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
    }
  />
);

export default AdminRoute;
