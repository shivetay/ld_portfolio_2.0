import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../common/Buttons/Button';
import { isAuthUser } from '../../../utils/utils';

import './Header.scss';

const Header = ({ auth: { user, loading }, logOut }) => {
  const logButtons = () => {
    const authData = isAuthUser();
    if (!authData) {
      return (
        <Button className='Header__Nav-button' to={`/login`}>
          Login
        </Button>
      );
    } else {
      if (
        !localStorage.getItem('jwt') ||
        localStorage.getItem('jwt') === undefined ||
        loading
      ) {
        return (
          <div className='Header__Nav-link'>
            <Button className='Header__Nav-button' to={`/login`}>
              Login
            </Button>
          </div>
        );
      } else {
        if (localStorage.getItem('jwt')) {
          if (user.role === 2308) {
            return (
              <div className='Header__Nav-link'>
                <Button className='Header__Nav-button' to={`/admin/dashboard`}>
                  Dashboard admin
                </Button>
                <Button className='Header__Nav-button' to={`/users/me`}>
                  Dashboard me
                </Button>
                <Button
                  className='Header__Nav-button'
                  to={`/`}
                  onClick={logOut}>
                  Logout
                </Button>
              </div>
            );
          } else {
            return (
              <div className='Header__Nav-link'>
                <Button className='Header__Nav-button' to={`/users/me`}>
                  Dashboard me
                </Button>
                <Button
                  className='Header__Nav-button'
                  to={`/`}
                  onClick={logOut}>
                  Logout
                </Button>
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
      <div className='Header__Buttons'>{logButtons()}</div>
    </div>
  );
};

Header.propTypes = {
  logOut: PropTypes.func,
  auth: PropTypes.any,
};

export default Header;
