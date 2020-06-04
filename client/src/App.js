import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout/MainLayout';
import Home from './components/views/Home/Home';

const App = () => {
  return (
    // <Provider store={}>
    <Fragment>
      <BrowserRouter>
        <MainLayout>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </MainLayout>
      </BrowserRouter>
    </Fragment>
    // </Provider>
  );
};

export default App;
