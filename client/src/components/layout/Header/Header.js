import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

const Header = () => {
  return (
    <div className='Header'>
      <div className='Header__Logo'>
        <NavLink className='flex' to='/'>
          <h3 className='Header__Logo-h3'>Łukasz Dawidowicz</h3>
          <p className='Header__Logo-paragraph'>Front-End Developer</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
