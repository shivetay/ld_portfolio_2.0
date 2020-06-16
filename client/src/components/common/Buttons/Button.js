import React from 'react';
import { Link } from 'react-router-dom';

// import { isAuthUser, signOut } from '../../../utils/utils';

import './Button.scss';

const Button = ({ href, to, exact, className, children, type, onClick }) => {
  if (href) {
    return (
      <a className='' href={href}>
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link to={to} exact={exact} className='' onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button
      className=''
      type={type}
      // onClick={onClick}
      // disabled={props.disabled}
    >
      {children}
    </button>
  );
};

export default Button;
