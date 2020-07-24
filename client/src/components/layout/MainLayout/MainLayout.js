import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const MainLayout = ({ children }) => {
  return (
    <section>
      <Header />
      <Fragment>{children}</Fragment>
      <Footer />
    </section>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
