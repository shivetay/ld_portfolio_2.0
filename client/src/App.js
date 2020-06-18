import React, { Fragment } from 'react';
// import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout/MainLayout';
import Home from './components/views/Home/Home';
import Login from './components/features/Login/Login';
import AdminRoute from './components/features/PrivateRoutes/AdminRoute';
import AdminDashboard from './components/views/AdminDashboard/AdminDashboard';
import PrivateRoute from './components/features/PrivateRoutes/PrivateRoute';
import UserDashboard from './components/views/UserDashboard/UserDashboard';

const App = () => {
  return (
    // <Provider store={}>
    <Fragment>
      <BrowserRouter>
        <MainLayout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/logout' component={Login} />
            <AdminRoute
              exact
              path='/admin/dashboard'
              component={AdminDashboard}
            />
            {/* <AdminRoute
              exact
              path='/projects/create/:userId'
              component={CreateProject}
            /> */}
            <PrivateRoute exact path='/users/me' component={UserDashboard} />
          </Switch>
        </MainLayout>
      </BrowserRouter>
    </Fragment>
    // </Provider>
  );
};

export default App;
