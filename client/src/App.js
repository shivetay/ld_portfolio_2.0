import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import MainLayout from './components/layout/MainLayout/MainLayout';
import Home from './components/views/Home/Home';
import Login from './components/features/Login/Login';
import AdminRoute from './components/features/PrivateRoutes/AdminRoute';
import AdminDashboard from './components/views/AdminDashboard/AdminDashboard';
import PrivateRoute from './components/features/PrivateRoutes/PrivateRoute';
import UserDashboard from './components/views/UserDashboard/UserDashboard';
import Projects from './components/views/Projects/Projects';
import Project from './components/views/Projects/Project';
import ProjectCreate from './components/views/Projects/ProjectCreate';
import ProjectUpdate from './components/views/Projects/ProjectUpdate';
import Contact from './components/views/Contact/Contact';

const App = () => {
  return (
    <Provider store={store}>
      <Fragment>
        <BrowserRouter>
          <MainLayout>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/logout' component={Home} />
              <AdminRoute
                exact
                path='/admin/dashboard'
                component={AdminDashboard}
              />
              <AdminRoute
                exact
                path='/projects/create/:userId'
                component={ProjectCreate}
              />
              <AdminRoute
                exact
                path='/projects/update/:projectId'
                component={ProjectUpdate}
              />
              <PrivateRoute exact path='/users/me' component={UserDashboard} />
              <Route exact path='/projects' component={Projects} />
              <Route exact path='/projects/:projectId' component={Project} />
              <Route exact path='/contact' component={Contact} />
            </Switch>
          </MainLayout>
        </BrowserRouter>
      </Fragment>
    </Provider>
  );
};

export default App;
