import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import Button from '../../common/Buttons/Button';
import { isAuthUser, signOut } from '../../../utils/utils';

import './Header.scss';

const Header = () => {
  const logButtons = () => {
    const authData = isAuthUser();
    if (authData === false) {
      return <Button to={`/login`}>Login</Button>;
    } else {
      const { user } = authData;
      if (user.role === 2308 && localStorage.getItem('jwt')) {
        return (
          <Fragment>
            <Button to={`/admin/dashboard`}>Dashboard admin</Button>
            <Button to={`/users/me`}>Dashboard me</Button>
            <Button to={`/`} onClick={signOut}>
              Logout
            </Button>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <Button to={`/users/me`}>Dashboard me</Button>
            <Button to={`/`} onClick={signOut}>
              Logout
            </Button>
          </Fragment>
        );
      }
    }

    // if (user.role === 2308 && localStorage.getItem('jwt'))
  };

  return (
    <div className='Header'>
      <div className='Header__Logo'>
        <NavLink className='flex' to='/'>
          <h3 className='Header__Logo-h3'>Łukasz Dawidowicz</h3>
          <p className='Header__Logo-paragraph'>Front-End Developer</p>
        </NavLink>
      </div>
      {!localStorage.getItem('jwt') ? (
        <Button to={`/login`}>Login</Button>
      ) : (
        logButtons()
      )}
    </div>
  );
};

export default Header;
