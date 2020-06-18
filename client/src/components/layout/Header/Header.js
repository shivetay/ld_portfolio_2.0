import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import Button from '../../common/Buttons/Button';
import { isAuthUser, signOut } from '../../../utils/utils';

import './Header.scss';

const Header = () => {
  const logButtons = () => {
    const { user } = isAuthUser();
    // console.log('user header', user.role);
    // user.role !== 2308 || user.role === 'undefined';

    return (
      <Fragment>
        <Button to={'/'} onClick={signOut}>
          Logout
        </Button>
        <Button to={`/admin/dashboard`}>Dashboard admin</Button>
        <Button to={`/users/me`}>Dashboard me</Button>;
      </Fragment>
    );
  };
  // if (user.role === 2308)
  // return <Button to={`/login`}>Login</Button>;

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
      {/* <Button to={'/'} onClick={signOut}>
        Logout
      </Button>
      <Button to={`/login`}>Login</Button>; */}
    </div>
  );
};

export default Header;
