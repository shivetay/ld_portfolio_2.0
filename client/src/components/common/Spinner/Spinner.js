import React from 'react';
import spinner from './spinner.gif';

import './Spinner.scss';

const Spinner = () => {
  return (
    <div className='Spinner'>
      <img src={spinner} alt='loading_spinner' />
    </div>
  );
};

export default Spinner;
