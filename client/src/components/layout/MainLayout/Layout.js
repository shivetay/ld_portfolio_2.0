import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './Layout.scss';

const Layout = ({ title, description, className, children }) => {
  return (
    <section className='Layout'>
      <div className='Layout__Container'>
        <div className='Layout__Header'>
          <h2 className='Layout__Header-header'>{title}</h2>
          <p className='Layout__Header-text'>{description}</p>
        </div>

        <main className={`Layout__Main-content ${className}`}>
          <Fragment>{children}</Fragment>
        </main>
      </div>
    </section>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.any,
};

export default Layout;
