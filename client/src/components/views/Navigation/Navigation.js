import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navigation = ({ path, name, className }) => {
  return (
    <NavLink to={`/${path}`} className={`${className}`}>
      {name}
    </NavLink>
  );
};

Navigation.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default Navigation;
