import React from 'react';
import { Link } from 'react-router-dom';

import './Button.scss';

const Button = ({ href, to, exact, className, children, type, onClick }) => {
  if (href) {
    return (
      <button>
        <a className={`button ${className}`} href={href}>
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
        className={`button ${className}`}
        onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`button ${className}`}
      type={type}
      onClick={onClick}
      // disabled={props.disabled}
    >
      {children}
    </button>
  );
};

export default Button;
