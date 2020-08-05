import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../common/Buttons/Button';
import { isAuthUser, signOut } from '../../../utils/utils';

import './Header.scss';

const Header = ({ auth: { user, loading } }) => {
  const logButtons = () => {
    const authData = isAuthUser();
    if (!authData) {
      return <Button to={`/login`}>Login</Button>;
    } else {
      if (
        !localStorage.getItem('jwt') ||
        localStorage.getItem('jwt') === undefined ||
        loading
      ) {
        return (
          <div className='Header__Nav-link'>
            <Button to={`/login`}>Login</Button>
          </div>
        );
      } else {
        if (localStorage.getItem('user') && localStorage.getItem('jwt')) {
          if (user.role === 2308) {
            console.log(user, 'user role admin');
            return (
              <div className='Header__Nav-link'>
                <Button to={`/admin/dashboard`}>Dashboard admin</Button>
                <Button to={`/users/me`}>Dashboard me</Button>
                <Button to={`/`} onClick={signOut}>
                  Logout
                </Button>
              </div>
            );
          } else {
            return (
              <div className='Header__Nav-link'>
                <Button to={`/users/me`}>Dashboard me</Button>
                <Button to={`/`} onClick={signOut}>
                  Logout
                </Button>
                {console.log(user, 'user role')}
              </div>
            );
          }
        }
      }
    }
  };

  return (
    <div className='Header'>
      <div className='Header__Logo'>
        <NavLink className='flex' to='/'>
          <h3 className='Header__Logo-h3'>Łukasz Dawidowicz</h3>
          <p className='Header__Logo-paragraph'>Front-End Developer</p>
        </NavLink>
      </div>
      {logButtons()}
    </div>
  );
};

Header.propTypes = {
  isAuth: PropTypes.bool,
  user: PropTypes.number,
  auth: PropTypes.any,
};

export default Header;
