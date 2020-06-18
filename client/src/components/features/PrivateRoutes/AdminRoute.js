import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthUser } from '../../../utils/utils';

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthUser().user.role === 2308 ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/users/me', state: { from: props.location } }}
        />
      )
    }
  />
);

export default AdminRoute;
