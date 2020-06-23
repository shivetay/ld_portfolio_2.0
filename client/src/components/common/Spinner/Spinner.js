import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <div>
      <img src={spinner} alt='loading_spinner' />
    </div>
  );
};

export default Spinner;
