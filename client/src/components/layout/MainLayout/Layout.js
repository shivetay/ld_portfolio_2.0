import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ title, description, className, children }) => {
  return (
    <div>
      <div className=''>
        <h2>{title}</h2>
        <p className=''>{description}</p>
      </div>

      <main className={className}>{children}</main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.any,
};

export default Layout;
