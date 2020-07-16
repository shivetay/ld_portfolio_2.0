import React from 'react';
import { Link } from 'react-router-dom';

// import { isAuthUser, signOut } from '../../../utils/utils';

import './Button.scss';

const Button = ({ href, to, exact, className, children, type, onClick }) => {
  if (href) {
    return (
      <button>
        <a className={`btn ${className}`} href={href}>
          {children}
        </a>
      </button>
    );
  }
  if (to) {
    return (
      <Link
        to={to}
        exact={exact}
        className={`btn ${className}`}
        onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`btn ${className}`}
      type={type}
      // onClick={onClick}
      // disabled={props.disabled}
    >
      {children}
    </button>
  );
};

export default Button;
